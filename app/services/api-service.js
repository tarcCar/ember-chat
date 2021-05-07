import Service from '@ember/service';
import axios from 'axios';
export default class ApiServiceService extends Service {
  getApi() {
    axios.defaults.baseURL = 'http://localhost:1337/';
    return axios;
  }
}
