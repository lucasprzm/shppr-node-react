import { IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class RideConfirmReqDto {
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

  distance: number;
  duration: string;

  @IsNotEmpty()
  driver: {
    id: number;
    name: string;
  };
  value: number;
}
