import { StorageBarData } from './bar-data.model';
import { StorageChartLine } from './chart-line.model';
import { StorageChartPie } from './chart-pie.model';
import { StorageTerminalsData } from './terminals.model';


export class StorageData {
  BarData?: StorageBarData;
  ChartLine?: StorageChartLine;
  PieChart?: StorageChartPie;
  TerminalsData?: StorageTerminalsData[];
}
