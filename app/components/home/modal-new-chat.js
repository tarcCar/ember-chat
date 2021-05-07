import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency';

export default class ModalNewChatComponent extends Component {
  @tracked chatName;
  @service chatService;
  @tracked modal;

  @action
  onOpenChange() {
    if (!this.modal) {
      const modalUserNome = new bootstrap.Modal(
        document.getElementById('modalNewChat'),
        {
          keyboard: false,
        }
      );
      this.modal = modalUserNome;
    }

    this.modal.toggle();
  }

  @dropTask
  async onChatSave() {
    try {
      if (!this.chatName) {
        return alert('Informar o nome do chat');
      }
      const chat = await this.chatService.save(this.chatName);

      if (this.args.onClose) {
        this.args.onClose(chat);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
