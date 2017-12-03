import { environment } from '../../environments/environment';

let urlapi;
if (environment.production) {
  urlapi = {
    server: '/restapi/Manage/',
    serverdemo: '/restapi/Demo/',
    serveraccount: '/restapi/Account/'
  };
} else {
  urlapi = {
    server: 'http://api.sevenbi.com/restapi/Manage/',
    serverdemo: 'http://api.sevenbi.com/restapi/Demo/',
    serveraccount: 'http://api.sevenbi.com/restapi/Account/'
  };
}

export const urlApi = urlapi;
