export class TItemIngridient {
  BelongsToTerminal: string;
  CurrentVol: string;
  DownloadVol: string;
  IssuanceVol: string;
  Name: string;
  Pid: string;
  Pk: string;
  Threshold: string;
  configStatus?: string;
}
export class TItemIngridients {
  IsSuccess?: boolean;
  TItemIngridients: TItemIngridient[];
}
