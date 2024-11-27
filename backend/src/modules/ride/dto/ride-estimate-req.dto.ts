import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotEqualTo } from 'src/common/decorators/is-not-equal-to.decorator';

export class RideEstimateReqDto {
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  @IsNotEqualTo('destination')
  origin: string;

  @IsString()
  @IsNotEmpty()
  @IsNotEqualTo('origin')
  destination: string;
}
