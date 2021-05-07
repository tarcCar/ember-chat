/* eslint-disable no-undef */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class HomeModalSelectUserComponent extends Component {
  @tracked userName;
  @service userService;
  @tracked modal;

  @action
  onOpenChange() {
    if (!this.modal) {
      const modalUserNome = new bootstrap.Modal(
        document.getElementById('modalUserNome'),
        {
          keyboard: false,
        }
      );
      this.modal = modalUserNome;
    }

    this.modal.toggle();
  }

  @dropTask
  async onUserNameSave() {
    try {
      if (!this.userName) {
        return alert('Informar o usuário');
      }
      const user = await this.userService.saveOrGetUser(this.userName);

      if (!user) {
        return alert('Não foi encontrado seu usuário');
      }

      if (this.args.onClose) {
        this.args.onClose();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
