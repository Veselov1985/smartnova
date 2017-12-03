class ChartDataItem {
  TerminalName: string;
  Value: number;
}
export class StorageChartPie {
  ChartData: ChartDataItem[];
  constructor() {
    this.ChartData = [];
  }
}
