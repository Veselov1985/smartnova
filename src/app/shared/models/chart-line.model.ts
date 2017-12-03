class DateItemChart {
  DateTime: Date;
  Value: number;
}
class ChartLine {
  ChartDataClossection: DateItemChart[];
  ChartDataSale: DateItemChart[];
}
export class StorageChartLine {
  IsSuccess?: boolean;
  ChartLine?: ChartLine;
}


