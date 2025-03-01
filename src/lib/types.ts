export type Aircraft = {
  ident: string;
  type: string;
  economySeats: number;
  base: string;
};

export type Flight = {
  ident: string;
  departuretime: number;
  arrivaltime: number;
  readable_departure: string;
  readable_arrival: string;
  origin: string;
  destination: string;
};

export type AircraftSchedule = {
  ident: string;
  flights: Flight[];
};
