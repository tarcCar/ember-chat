import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency';

export default class HomeComponent extends Component {
  @service userService;
  @service chatService;

  @tracked open;
  @tracked newChatOpen;
  @tracked userChats;
  @tracked userChatsNotIn;
  @tracked chat;

  @dropTask
  async getUserChat() {
    try {
      const chats = await this.userService.getChats();
      this.userChats = chats;
    } catch (e) {
      console.log(e);
    }
  }

  @dropTask
  async getUserChatNotIn() {
    try {
      const chats = await this.userService.getChatsNotIn();
      this.userChatsNotIn = chats;
    } catch (e) {
      console.log(e);
    }
  }

  @dropTask
  async onNewChatSelected(chat) {
    try {
      this.chatService.leave(this.chat);
      this.chatService.join(chat);
      this.chat = chat;
    } catch (e) {
      console.log(e);
    }
  }

  @action
  didInit() {
    this.open = true;
  }

  @action
  modelUserNameClose() {
    this.open = false;
    this.getUserChat.perform();
    this.getUserChatNotIn.perform();
  }

  @action
  modelChatClose() {
    this.newChatOpen = false;
    this.getUserChatNotIn.perform();
  }

  @action
  onNewChatClick() {
    this.newChatOpen = true;
  }
}
