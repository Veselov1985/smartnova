export class TItemEvent {
  BelongsToTerminal: string;
  DateTime: Date;
  Name: string;
  Pk: string;
  Type: string;
  Viewed: true;
  TotalNumber: number;
}

 class TItemEvents {
  IsSuccess?: boolean;
  TItemEvents: TItemEvent[];
}

