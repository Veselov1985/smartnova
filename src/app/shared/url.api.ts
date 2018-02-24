import { environment } from '../../environments/environment';

let urlapi;
if (environment.production) {
  urlapi = {
    server: '/restapi/Manage/',
    serverdemo: '/restapi/Demo/',
    serveraccount: '/restapi/Account/',
    rootPath: ''
  };
} else {
  urlapi = {
    server: 'http://telemetry.smartnovagroup.com/restapi/Manage/',
    serverdemo: 'http://telemetry.smartnovagroup.com/restapi/Demo/',
    serveraccount: 'http://telemetry.smartnovagroup.com/restapi/Account/',
    rootPath: 'http://telemetry.smartnovagroup.com/'
  };
}

export const urlApi = urlapi;
