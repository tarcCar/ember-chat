import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class ChatServiceService extends Service {
  @service session;
  send(messageText) {
    return new Promise((resolve, reject) => {
      try {
        io.socket.post(
          '/mensagem/send',
          {
            chat: this.session.openChat.id,
            sender: this.session.user.id,
            mensagem: messageText,
          },
          (data) => {
            resolve(data);
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }
}
