import { TerminalItemComponent } from './terminal-item.component';
import {
  ProductsComponent,
  ProductsReportComponent,
  ProdictIngredientsComponent,
  ProductsMultifilterComponent,
  ProductsConfiguratorComponent,
 } from './products';
import {
  SellsComponent,
  SellsReportComponent,
  SellsMultifilterComponent,
} from './sells';
import {
  CollectionComponent,
  CollectionReportComponent,
  CollectionMultifilterComponent,

 } from './collection';
import {
  EventsComponent,
  EventsReportComponent,
  EventsMultifilterComponent,
  EventsConfiguratorComponent,
  EventsStatsComponent
 } from './events';
import {
  IngridientsComponent,
  IngridientsReportComponent,
  IngredientsMultifilterComponent,
  IngredientsConfiguratorComponent,
 } from './ingridients';



import { TerminalItemRoutingModule } from './terminal-item-routing.module';


const TERMINAL_ITEMS_COMPONENTS: any[] = [
  TerminalItemComponent,

  CollectionComponent,
  CollectionReportComponent,
  CollectionMultifilterComponent,

  EventsComponent,
  EventsReportComponent,
  EventsMultifilterComponent,
  EventsConfiguratorComponent,
  EventsStatsComponent,

  IngridientsComponent,
  IngridientsReportComponent,
  IngredientsMultifilterComponent,
  IngredientsConfiguratorComponent,

  ProductsComponent,
  ProductsReportComponent,
  ProdictIngredientsComponent,
  ProductsMultifilterComponent,
  ProductsConfiguratorComponent,

  SellsComponent,
  SellsReportComponent,
  SellsMultifilterComponent,
];

export{
  TerminalItemRoutingModule,

  TERMINAL_ITEMS_COMPONENTS,
  TerminalItemComponent,

  CollectionComponent,
  CollectionReportComponent,
  CollectionMultifilterComponent,

  EventsComponent,
  EventsReportComponent,
  EventsMultifilterComponent,
  EventsConfiguratorComponent,
  EventsStatsComponent,

  IngridientsComponent,
  IngridientsReportComponent,
  IngredientsMultifilterComponent,
  IngredientsConfiguratorComponent,

  ProductsComponent,
  ProductsReportComponent,
  ProdictIngredientsComponent,
  ProductsMultifilterComponent,
  ProductsConfiguratorComponent,

  SellsComponent,
  SellsReportComponent,
  SellsMultifilterComponent,

};
