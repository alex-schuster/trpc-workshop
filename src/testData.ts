import type { Flight, Airport } from "@prisma/client";
const testAirports: Airport[] = [
  {
    code: "VIE",
    name: "Vienna Airport",
    city: "Vienna",
  },
  {
    code: "LHR",
    name: "London Heathrow Airport",
    city: "London",
  },
  {
    code: "CDG",
    name: "Charles de Gaulle Airport",
    city: "Paris",
  },
  {
    code: "TYO",
    name: "Tokyo Haneda Airport",
    city: "Tokyo",
  },
  {
    code: "LAX",
    name: "Los Angeles International Airport",
    city: "Los Angeles",
  },
  {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "New York",
  },
  {
    code: "AMS",
    name: "Amsterdam Airport Schiphol",
    city: "Amsterdam",
  },
  {
    code: "SYD",
    name: "Sydney Kingsford Smith Airport",
    city: "Sydney",
  },
  {
    code: "HKG",
    name: "Hong Kong International Airport",
    city: "Hong Kong",
  },
  {
    code: "SIN",
    name: "Singapore Changi Airport",
    city: "Singapore",
  },
  {
    code: "MUC",
    name: "Munich Airport",
    city: "Munich",
  },
  {
    code: "ICN",
    name: "Incheon International Airport",
    city: "Seoul",
  },
  {
    code: "MAD",
    name: "Adolfo Suárez Madrid–Barajas Airport",
    city: "Madrid",
  },
  {
    code: "IST",
    name: "Istanbul Atatürk Airport",
    city: "Istanbul",
  },
  {
    code: "FCO",
    name: "Leonardo da Vinci–Fiumicino Airport",
    city: "Rome",
  },
  {
    code: "DXB",
    name: "Dubai International Airport",
    city: "Dubai",
  },
  {
    code: "PEK",
    name: "Beijing Capital International Airport",
    city: "Beijing",
  },
  {
    code: "ORD",
    name: "O'Hare International Airport",
    city: "Chicago",
  },
  {
    code: "FRA",
    name: "Frankfurt Airport",
    city: "Frankfurt",
  },
  {
    code: "BKK",
    name: "Suvarnabhumi Airport",
    city: "Bangkok",
  },
];

const testFlights: Flight[] = [
  {
    id: "1",
    flightNumber: "123",
    departureAt: new Date("2021-09-01T00:00:00.000Z"),
    arrivalAt: new Date("2021-09-01T00:00:00.000Z"),
    capacity: 100,
    destinationId: "LHR",
    originId: "VIE",
    price: 100,
  },
  {
    id: "2",
    flightNumber: "456",
    departureAt: new Date("2021-09-01T00:00:00.000Z"),
    arrivalAt: new Date("2021-09-01T00:00:00.000Z"),
    capacity: 100,
    destinationId: "CDG",
    originId: "LHR",
    price: 420,
  },

  {
    id: "3",
    flightNumber: "789",
    departureAt: new Date("2021-09-01T00:00:00.000Z"),
    arrivalAt: new Date("2021-09-01T00:00:00.000Z"),
    capacity: 100,
    destinationId: "TYO",
    originId: "CDG",
    price: 34,
  },
  {
    id: "4",
    flightNumber: "101",
    departureAt: new Date("2021-09-01T00:00:00.000Z"),
    arrivalAt: new Date("2021-09-01T00:00:00.000Z"),
    capacity: 100,
    destinationId: "LAX",
    originId: "TYO",
    price: 100,
  },

  {
    id: "5",
    flightNumber: "111",
    departureAt: new Date("2021-09-01T00:00:00.000Z"),
    arrivalAt: new Date("2021-09-01T00:00:00.000Z"),
    capacity: 100,
    destinationId: "VIE",
    originId: "LAX",
    price: 1000,
  },

  {
    id: "6",
    flightNumber: "121",
    departureAt: new Date("2021-09-01T00:00:00.000Z"),
    arrivalAt: new Date("2021-09-01T00:00:00.000Z"),
    capacity: 100,
    destinationId: "LHR",
    originId: "VIE",
    price: 200,
  },
  {
    id: "31",
    flightNumber: "234",
    departureAt: new Date("2021-09-02T13:30:00.000Z"),
    arrivalAt: new Date("2021-09-02T18:45:00.000Z"),
    capacity: 150,
    destinationId: "MUC",
    originId: "AMS",
    price: 222,
  },
  {
    id: "32",
    flightNumber: "345",
    departureAt: new Date("2021-09-03T09:00:00.000Z"),
    arrivalAt: new Date("2021-09-03T12:15:00.000Z"),
    capacity: 200,
    destinationId: "JFK",
    originId: "ICN",
    price: 999,
  },
  {
    id: "33",
    flightNumber: "456",
    departureAt: new Date("2021-09-04T20:30:00.000Z"),
    arrivalAt: new Date("2021-09-05T02:45:00.000Z"),
    capacity: 120,
    destinationId: "BKK",
    originId: "FCO",
    price: 1,
  },
  {
    id: "34",
    flightNumber: "567",
    departureAt: new Date("2021-09-05T08:00:00.000Z"),
    arrivalAt: new Date("2021-09-05T16:45:00.000Z"),
    capacity: 250,
    destinationId: "LAX",
    originId: "SYD",
    price: 650,
  },
  {
    id: "35",
    flightNumber: "678",
    departureAt: new Date("2021-09-06T12:00:00.000Z"),
    arrivalAt: new Date("2021-09-06T14:15:00.000Z"),
    capacity: 100,
    destinationId: "SYD",
    originId: "BKK",
    price: 99,
  },
];

export { testFlights, testAirports };
