export class RideByCustomerDto {
  customer_id: string;
  rides: RideDriverDto[];
}

class RideDriverDto {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}
