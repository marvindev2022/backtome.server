import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UserRepository } from '@app/repositories/User/user';

interface S3UploadInterface {
  file: Express.Multer.File;
  bucket: string;
  originalName: string;
  mimetype: string;
}

@Injectable()
export class FileService {
  constructor(private userRepository: UserRepository) {}
  private AWS_S3_BUCKET = process.env.AWS_S3_BUCKET as string;
  private s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_S3_KEY_SECRET as string,
    },
    endpoint: new AWS.Endpoint(process.env.AWS_S3_ENDPOINT as string),
  });

  async uploadPhoto(
    id: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const photoUrl = await this.s3_upload({
      file,
      bucket: this.AWS_S3_BUCKET,
      originalName: file.originalname,
      mimetype: file.mimetype,
    });

    await this.userRepository.saveImage(id, photoUrl);

    return 'Imagem salva !';
  }
  async uploadFile(
    id: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const fileUrl = await this.s3_upload({
      file,
      bucket: this.AWS_S3_BUCKET,
      originalName: file.originalname,
      mimetype: file.mimetype,
    });

    await this.userRepository.saveFile(id, fileUrl);

    return 'Imagem salva !';
  }

  private async s3_upload({
    file,
    bucket,
    originalName,
    mimetype,
  }: S3UploadInterface): Promise<string> {
    const s3Response = await this.s3
      .upload({
        Bucket: bucket,
        Key: originalName,
        Body: file.buffer,
        ContentType: mimetype,
      })
      .promise();

    return s3Response.Location;
  }
}
