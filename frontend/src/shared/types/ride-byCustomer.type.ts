export type RideByCustomer = {
  customer_id: string;
  rides: RideDriver[];
};

export type RideDriver = {
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
};
