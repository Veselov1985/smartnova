import { StartComponent } from './start.component';
import { StartRoutingModule } from './start-routing.module';
import { TERMINALS_COMPONENT } from './terminals/terminals';

const START_COMPONENT: any[] = [
  StartComponent,
  TERMINALS_COMPONENT,
];

export{
  StartRoutingModule,
  TERMINALS_COMPONENT,
  START_COMPONENT,
};
