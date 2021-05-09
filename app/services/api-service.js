import Service from '@ember/service';
import axios from 'axios';
import config from 'ember-chat/config/environment';

export default class ApiServiceService extends Service {
  getApi() {
    axios.defaults.baseURL = config.APP.API_URL;
    console.log(config.APP.API_URL);
    return axios;
  }
}
