import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class UserServiceService extends Service {
  @service apiService;
  @service session;

  api = null;

  constructor() {
    super(...arguments);
    this.api = this.apiService.getApi();
  }

  async saveOrGetUser(userName) {
    const response = await this.api.post('user', {
      nome: userName,
    });
    const user = response.data;
    this.session.setUser(user);
    return user;
  }

  async getChats() {
    const user = this.session.user;
    const response = await this.api.get(`user/${user.id}/chats`);
    return response.data;
  }

  async getChatsNotIn() {
    const user = this.session.user;
    const response = await this.api.get(`user/${user.id}/chatsNotIn`);
    return response.data;
  }
}
