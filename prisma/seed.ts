import { Flight, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const airports = [
  { code: 'VIE', city: 'Vienna', name: 'Schwechat' },
  { code: 'BER', city: 'Berlin', name: 'Brandenburg' },
  { code: 'LHR', city: 'London', name: 'Heathrow' },
  { code: 'AMS', city: 'Amsterdam', name: 'Schiphol' },
  { code: 'FCO', city: 'Rome', name: 'Fiumicino' },
  { code: 'BCN', city: 'Barcelona', name: 'El Prat' }
];

const flights = [
  {
    flightNumber: 'AUA123',
    originId: 'VIE',
    destinationId: 'LHR',
    departureAt: new Date('2023-03-23T09:15:00Z'),
    arrivalAt: new Date('2023-03-23T011:30:00Z'),
    capacity: 170,
    price: 220
  }
];

async function main() {
  const airportPromises = airports.map((item) => {
    return prisma.airport.upsert({
      where: {
        code: item.code
      },
      update: {},
      create: item
    });
  });
  const flightPromises = flights.map((item) => {
    return prisma.flight.create({
      data: item
    });
  });
  await Promise.all([
    ...airportPromises,
    ...flightPromises
  ]);
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
