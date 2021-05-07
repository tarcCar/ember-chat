import Component from '@glimmer/component';
import { A } from '@ember/array';
import { dropTask } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeChatComponent extends Component {
  @service messageService;
  @service chatService;
  @service session;

  @tracked textMessage;
  @tracked chatMessages = A();

  @dropTask
  async sendMessage() {
    if (!this.textMessage) return alert('Mensagem é obrigatoria');
    const message = await this.messageService.send(this.textMessage);
    message.type = 'sender';
    this.chatMessages.pushObject(message);
  }

  @action
  initEventListiner() {
    this.chatMessages = A(this.args.chat.mensagens);
    io.socket.on('newMessage', (newMessage) => {
      const message = newMessage.message;
      if (!message) return;
      this.chatMessages.pushObject(message);
    });
  }

  @action
  removeEventListiner() {
    this.chatService.leave(this.args.chat.id);
  }
}
