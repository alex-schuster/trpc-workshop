import { PrismaClient } from "@prisma/client";
import type { Airport, Flight } from "@prisma/client";
const prisma = new PrismaClient();
import {
  randUuid,
  randNumber,
  randRecentDate,
  randSoonDate,
} from "@ngneat/falso";

const airports: Airport[] = [
  { code: "VIE", city: "Vienna", name: "Schwechat" },
  { code: "BER", city: "Berlin", name: "Brandenburg" },
  { code: "LHR", city: "London", name: "Heathrow" },
  { code: "AMS", city: "Amsterdam", name: "Schiphol" },
  { code: "FCO", city: "Rome", name: "Fiumicino" },
  { code: "BCN", city: "Barcelona", name: "El Prat" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle" },
  { code: "IST", city: "Istanbul", name: "Istanbul Airport" },
  { code: "SVO", city: "Moscow", name: "Sheremetyevo" },
  { code: "DXB", city: "Dubai", name: "Dubai International" },
  { code: "JFK", city: "New York", name: "John F. Kennedy" },
  { code: "LAX", city: "Los Angeles", name: "Los Angeles" },
  { code: "SFO", city: "San Francisco", name: "San Francisco" },
  { code: "NRT", city: "Tokyo", name: "Narita" },
  { code: "HND", city: "Tokyo", name: "Haneda" },
  { code: "PEK", city: "Beijing", name: "Beijing Capital" },
  { code: "PVG", city: "Shanghai", name: "Pudong" },
  { code: "SYD", city: "Sydney", name: "Sydney" },
  { code: "MEL", city: "Melbourne", name: "Melbourne" },
  { code: "AKL", city: "Auckland", name: "Auckland" },
  { code: "JNB", city: "Johannesburg", name: "O.R. Tambo" },
  { code: "CPT", city: "Cape Town", name: "Cape Town" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji" },
  { code: "DEL", city: "New Delhi", name: "Indira Gandhi" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi" },
  { code: "KUL", city: "Kuala Lumpur", name: "Kuala Lumpur" },
  { code: "HKG", city: "Hong Kong", name: "Hong Kong" },
  { code: "ICN", city: "Seoul", name: "Incheon" },
  { code: "SIN", city: "Singapore", name: "Changi" },
  { code: "CGK", city: "Jakarta", name: "Soekarno-Hatta" },
  { code: "MEX", city: "Mexico City", name: "Benito Juárez" },
  { code: "GRU", city: "São Paulo", name: "Guarulhos" },
  { code: "EZE", city: "Buenos Aires", name: "Ministro Pistarini" },
];

function generateFlights(airports: Airport[]) {
  const flights: Flight[] = [];
  const airportCount = airports.length;

  for (let i = 0; i < 200; i++) {
    const origin = airports[randNumber({ min: 0, max: airportCount - 1 })];
    let destination;
    do {
      destination = airports[randNumber({ min: 0, max: airportCount - 1 })];
    } while (origin!.code === destination!.code); // Ensure destination is different from origin

    const flight: Flight = {
      id: randUuid(),
      flightNumber: randNumber({ min: 10, max: 1000 }).toString(),
      capacity: randNumber({ min: 100, max: 500 }),
      price: randNumber({ min: 100, max: 9999 }),
      departureAt: randRecentDate(),
      arrivalAt: randSoonDate(),
      originId: origin!.code,
      destinationId: destination!.code,
    };
    flights.push(flight);
  }

  return flights;
}

async function main() {
  const airportPromises = airports.map((item) => {
    return prisma.airport.upsert({
      where: {
        code: item.code,
      },
      update: {},
      create: item,
    });
  });
  const flightPromises = generateFlights(airports).map((flight) => {
    return prisma.flight.create({
      data: flight,
    });
  });
  await Promise.all([...airportPromises, ...flightPromises]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
