import { MessageService } from '@infra/http/services/message/message.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('message')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  async createMessage(@Body() message: any) {
    return await this.messageService.createMessage(message);
  }

  @Get(':id/find')
  async findMessageByUserId(@Param('id') id: string) {
    return await this.messageService.findMessageByUserId(id);
  }

 
}
