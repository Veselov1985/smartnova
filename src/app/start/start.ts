import { StartComponent } from './start.component';
import { StartRoutingModule } from './start-routing.module';
import { TERMINALS_COMPONENT } from './terminals/terminals';
// import { START_LAYOUT_COMPONENT } from './layout/layout.module';




const START_COMPONENT: any[] = [
  StartComponent,
  TERMINALS_COMPONENT,

  // START_LAYOUT_COMPONENT
];

export{
  StartComponent,
  StartRoutingModule,
  TERMINALS_COMPONENT,
  // START_LAYOUT_COMPONENT,
  START_COMPONENT,
};
