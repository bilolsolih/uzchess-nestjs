import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from '@/features/chat/dtos/message.dto';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';
import { UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '@/core/guards/authentication.guard';


@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('uzchess-client')
  @UseGuards(AuthenticationGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  handleMessages(@MessageBody() message: MessageDto) {
    this.server.emit('uzchess-server', message);
    return message;
  }
}