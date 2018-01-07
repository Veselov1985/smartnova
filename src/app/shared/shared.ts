import { RadioLabelsPipe } from './pipes/radio-labels.pipe';

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
import { MultiFilterProductsPipe } from './pipes/multi-filter-products.pipe';
import { MultiFilterTerminalsPipe } from './pipes/multi-filter-terminals.pipe';
import { MultiFilterSellsPipe } from './pipes/multi-filter-sells.pipe';

// import { FocusLeavDirective } from './directives/focus-leav.directive';
// import { HidefoneDirective } from './directives/hidefone.directive';


const SHARED_INTARFACE: any[] = [
  User,
  emailMatcher,
  // HidefoneDirective,

];

const SHARED_PIPE: any[] = [
  DataFilterPipe,
  MultiFilterProductsPipe,
  MultiFilterSellsPipe,
  MultiFilterTerminalsPipe,
  RadioLabelsPipe,
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
  MultiFilterProductsPipe,
  MultiFilterSellsPipe,
  MultiFilterTerminalsPipe,
  RadioLabelsPipe,
  DateTimePipe,
  SHARED_PIPE,

  SHARED_INTARFACE,
  User,
  emailMatcher,
  // HidefoneDirective,

  SHARED_DERECTIVE,
  // FocusLeavDirective,
};
