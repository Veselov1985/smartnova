export class TItemEvent {
  BelongsToTerminal: string;
  DateTime: Date;
  Name: string;
  Pk: string;
  Type: string;
  Viewed: true;
}

 class TItemEvents {
  IsSuccess?: boolean;
  TItemEvents: TItemEvent[];
}

