import { IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class RideEstimateReqDto {
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('destination')
  origin: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('origin')
  destination: string;
}
