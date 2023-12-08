import { Controller, Get } from '@nestjs/common';

@Controller()
export class MessageController {
  @Get()
  message() {
    const swaggerLink =
      'https://app.swaggerhub.com/apis-docs/MAVIROLERO/back-to_me_api/1.0.0';
    return `Bem-vindo à API BackToMe. , acesse  nossa documentação em: <a href="${swaggerLink}">BackToMe.</a>`;
  }
}
