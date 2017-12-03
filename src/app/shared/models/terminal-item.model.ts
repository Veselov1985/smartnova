import { Terminal } from './terminal.model';

import {TItemSells} from './t-item-sells.model';
import {TItemProducts} from './t-item-products.model';
import {TItemCollections} from './t-item-collection.model';
import {TItemEvent} from './t-item-events.model';
import {TItemIngridients} from './t-item-ingridients.model';


export class TerminalItem {
  IsSuccess?: boolean;
  TerminalItem?: Terminal;
  TItemSells?: TItemSells;
  TItemProducts?: TItemProducts;
  TItemCollection?: TItemCollections;
  TItemEvents?: TItemEvent;
  TItemIngridients?: TItemIngridients;
}
