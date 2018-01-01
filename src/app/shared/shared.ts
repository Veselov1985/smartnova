
import { BurgerService } from './services/common/burger.service';
import { AuthService } from './services/auth/auth.service';
import { ClientDataService } from './services/auth/client-data.service';


import {
  StateConfiguratorService,
  StateConfigModeService,
  StateMultifilterService,
  StateUserpanelService,
  TerminalProductsConfiguratorService,
  TerminalEventsConfiguratorService,
  TerminalIngredientsConfiguratorService
} from './index';

import { User } from './models';

import { emailMatcher } from './pipes/email-matcher';
import { DateTimePipe } from './pipes/date-time.pipe';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { MultiFilterPipe } from './pipes/multi-filter.pipe';

// import { FocusLeavDirective } from './directives/focus-leav.directive';
// import { HidefoneDirective } from './directives/hidefone.directive';


const SHARED_INTARFACE: any[] = [
  User,
  emailMatcher,
  // HidefoneDirective,

];

const SHARED_PIPE: any[] = [
  DataFilterPipe,
  MultiFilterPipe,
  DateTimePipe,
];
const SHARED_PROVIDE: any[] = [
  BurgerService,
  AuthService,
  ClientDataService,
  StateConfiguratorService,
  StateConfigModeService,
  StateMultifilterService,
  StateUserpanelService,
  TerminalProductsConfiguratorService,
  TerminalIngredientsConfiguratorService,
  TerminalEventsConfiguratorService
];

const SHARED_DERECTIVE: any[] = [
  // FocusLeavDirective
];
export {

  BurgerService,
  AuthService,
  ClientDataService,
  SHARED_PROVIDE,


  DataFilterPipe,
  MultiFilterPipe,
  DateTimePipe,
  SHARED_PIPE,

  SHARED_INTARFACE,
  User,
  emailMatcher,
  // HidefoneDirective,

  SHARED_DERECTIVE,
  // FocusLeavDirective,
};
