import Service from '@ember/service';

export default class SessionService extends Service {
  user = null;
  openChat = null;

  setUser(user) {
    this.user = user;
  }

  setOpenChat(chat) {
    this.openChat = chat;
  }
}
