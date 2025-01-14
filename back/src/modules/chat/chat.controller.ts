import { Controller, Get } from '@nestjs/common';
import { ChatGateway } from './server.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatGateway: ChatGateway) {}

  @Get('users')
  getUsers() {
    return this.chatGateway.getUsers();
  }
}
