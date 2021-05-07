import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class ChatServiceService extends Service {
  @service session;
  @service apiService;

  api = null;

  constructor() {
    super(...arguments);
    this.api = this.apiService.getApi();
  }

  async save(chatName) {
    const response = await this.api.post('chat', {
      nome: chatName,
    });
    const chat = response.data;
    return chat;
  }

  join(chat) {
    try {
      io.socket.post(
        '/chat/join',
        {
          chat: chat.id,
          user: this.session.user.id,
        },
        (data) => {
          console.log(data);
        }
      );
      this.session.setOpenChat(chat);
    } catch (e) {
      console.log(e);
    }
  }

  leave(chat) {
    try {
      io.socket.post(
        '/chat/leave',
        {
          chat: chat.id,
        },
        (data) => {
          console.log(data);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
}
