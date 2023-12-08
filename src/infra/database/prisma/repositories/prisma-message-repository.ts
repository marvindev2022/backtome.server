import { BadRequestException, Injectable } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Message } from '@domain/message/Message';
import { MessageRepository } from '@app/repositories/Message/message';
import { Firestore, getFirestore } from 'firebase/firestore';
import { SocketService } from '@infra/Socket/socket.service'; // Importe o serviço do socket
import * as crypto from 'crypto';

interface MessageProps {
  id?: string;
  title: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}
const firebaseConfig = {
  apiKey: 'AIzaSyAp4bA4T2HAnk6QPF9CDcfCq_2XWerkzqY',
  authDomain: 'chat-btm.firebaseapp.com',
  projectId: 'chat-btm',
  storageBucket: 'chat-btm.appspot.com',
  messagingSenderId: '330622068920',
  appId: '1:330622068920:web:211816e6f006a1ea126c4d',
  measurementId: 'G-81XGHZ9F45',
}
@Injectable()
export class FirebaseMessagesRepository implements MessageRepository {
  private firestore: Firestore;
  private app: FirebaseApp;
  private encryptionKey: Buffer 

  constructor(private socketService: SocketService) {
    this.app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.app);
    this.encryptionKey = crypto.createHash('sha256').update(process.env.JWT_SECRET as string).digest()
  }

  async register(message: Message): Promise<string> {
    try {
      const { title, content, senderId, receiverId } = message.props;

      const messagesRef = collection(this.firestore, 'messages');
      const encryptedContent = this.encrypt(content);

      await addDoc(messagesRef, {
        title,
        content: encryptedContent,
        senderId,
        receiverId,
        createdAt: new Date(),
        resolved: false,
        resolutionDescription: '',
      });

      this.socketService.emitNewMessage(message.props);
      return 'Registramos sua mensagem';
    } catch (error) {
      throw new BadRequestException('Erro ao registrar mensagem');
    }
  }

  async findMessageByUserId(id: string): Promise<MessageProps[] | Error> {
    try {
      const messagesRef = collection(this.firestore, 'messages');
      const senderQuery = query(messagesRef, where('senderId', '==', id));
      const receivedQuery = query(messagesRef, where('receiverId', '==', id));

      const [senderSnapshot, receivedSnapshot] = await Promise.all([
        getDocs(senderQuery),
        getDocs(receivedQuery),
      ]);

      const messages: MessageProps[] = [];
      senderSnapshot.forEach((doc) => {
        const messageData = doc.data() as MessageProps;
        const messageWithId: MessageProps = {
          id: doc.id,
          ...messageData,
        };
        messages.push(messageWithId);
      });

      receivedSnapshot.forEach((doc) => {
        const messageData = doc.data() as MessageProps;
        const messageWithId: MessageProps = {
          id: doc.id,
          ...messageData,
        };
        messages.push(messageWithId);
      });

      messages.forEach((message) => {
        message.content = this.decrypt(message.content);
      });

      return messages;
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Erro ao buscar mensagem do Usuário');
    }
  }

  async findMessageById(id: string): Promise<any | Error> {
    try {
      const messageRef = doc(this.firestore, 'messages', id);
      const messageSnapshot = await getDoc(messageRef);

      if (!messageSnapshot.exists()) {
        throw new BadRequestException('Mensagem não encontrada');
      }

      const messageData = messageSnapshot.data() as MessageProps;
      messageData.content = this.decrypt(messageData.content);
      return [messageData];
    } catch (error) {
      console.error('Erro:', error);
      throw new BadRequestException('Erro ao buscar mensagem');
    }
  }

  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, iv);
    let encryptedText = cipher.update(text, 'utf8', 'hex');
    encryptedText += cipher.final('hex');
    return `${iv.toString('hex')}:${encryptedText}`;
  }

  private decrypt(encryptedText: string): string {
    const [ivHex, encryptedData] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.encryptionKey, iv);
    let decryptedText = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
  }
}
