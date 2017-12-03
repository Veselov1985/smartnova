class TItemCollection {
  BelongsToTerminal: string;
  DateTime: Date;
  Collection: number;
  FundChange: number;
  GivenChange: number;
  Pk: string;
  ServiceMan: string;
}
export class TItemCollections {
  IsSuccess?: boolean;
  TItemIngridients: TItemCollection[];
}
