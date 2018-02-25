import { ShareDataService } from './services/common/share-data.service';
import { RadioLabelsPipe } from './pipes/radio-labels.pipe';

import { BurgerService } from './services/common/burger.service';
import { AuthService } from './services/auth/auth.service';
import { ClientDataService } from './services/auth/client-data.service';
import { SignalRService } from './services/auth/signalr.service';


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
import { MultiFilterCollectPipe } from './pipes/multi-filter-collect.pipe';
import { MultiFilterIngredientsPipe } from './pipes/multi-filter-ingredients.pipe';
import { MultiFilterEventsPipe } from './pipes/multi-filter-events.pipe';
import { ReportLoggingService } from './services/common/report-logging.service';

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
  MultiFilterCollectPipe,
  MultiFilterEventsPipe,
  MultiFilterIngredientsPipe,
  MultiFilterTerminalsPipe,
  RadioLabelsPipe,
  DateTimePipe,
];
const SHARED_PROVIDE: any[] = [
  BurgerService,
  AuthService,
  ReportLoggingService,
  ClientDataService,
  StateConfiguratorService,
  StateConfigModeService,
  StateMultifilterService,
  StateUserpanelService,
  TerminalProductsConfiguratorService,
  TerminalIngredientsConfiguratorService,
  TerminalEventsConfiguratorService,
  ShareDataService,
  SignalRService
];

const SHARED_DERECTIVE: any[] = [
  // FocusLeavDirective
];
export {

  BurgerService,
  AuthService,
  ReportLoggingService,
  ClientDataService,
  SHARED_PROVIDE,


  DataFilterPipe,
  MultiFilterProductsPipe,
  MultiFilterSellsPipe,
  MultiFilterCollectPipe,
  MultiFilterEventsPipe,
  MultiFilterIngredientsPipe,
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
