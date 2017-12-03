import { TerminalsComponent } from './terminals.component';
import { TerminalsReportComponent } from './terminals-report/terminals-report.component';
import { TerminalsMultifilterComponent } from './terminals-multifilter/terminals-multifilter.component';

import {
  TerminalItemRoutingModule,
  TERMINAL_ITEMS_COMPONENTS
} from './terminal-item/terminal-item';

const TERMINALS_COMPONENT: any[] = [
  TerminalsComponent,
  TerminalsReportComponent,
  TerminalsMultifilterComponent,
  TERMINAL_ITEMS_COMPONENTS,
]

export{
  TerminalsComponent,
  TerminalsReportComponent,
  TerminalItemRoutingModule,
  TerminalsMultifilterComponent,
  TERMINAL_ITEMS_COMPONENTS,
  TERMINALS_COMPONENT
}
