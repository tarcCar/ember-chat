import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HomeChatMessageComponent extends Component {
  @service session;
  @computed('args.message.sender', 'session.user.id')
  get messageType() {
    const mensagem = this.args.message;
    if (mensagem.sender.id === this.session.user.id) {
      return 'sender';
    } else if (mensagem.sender) {
      return 'recive';
    } else {
      return 'system';
    }
  }
}
