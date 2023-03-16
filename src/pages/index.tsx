import type { Airport, Flight } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { memo, useEffect, useState } from "react";
import Autocomplete from "~/components/Autocomplete";
import FlightResults from "~/components/FlightResults";
import { testAirports, testFlights } from "~/testData";

const Home: NextPage = () => {
  const [from, setFrom] = useState<Airport | null>(null);
  const [to, setTo] = useState<Airport | null>(null);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

  useEffect(() => {
    filterFlights(from, to);
  }, [from, to]);

  const handleSelectFrom = (airport: Airport) => {
    setFrom(airport);
  };

  const handleSelectTo = (airport: Airport) => {
    setTo(airport);
  };

  // TODO zu tRPC procedure machen
  const filterFlights = (
    originAirport: Airport | null,
    destinationAirport: Airport | null
  ): void => {
    if (!originAirport && !destinationAirport) {
      setFilteredFlights([]);
      return;
    }
    const filteredFlights = testFlights.filter((flight) => {
      return (
        (flight.originId == originAirport?.code || !originAirport) &&
        (flight.destinationId == destinationAirport?.code ||
          !destinationAirport)
      );
    });

    setFilteredFlights(filteredFlights);
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Checkfelix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-10">
        <h1 className="mb-10 text-center text-4xl font-bold">Flight Finder</h1>
        <div className="justify-evenl container flex flex-row gap-2">
          <Autocomplete
            id="from"
            placeHolder="From"
            airports={testAirports}
            handleSelectOption={handleSelectFrom}
          />
          <Autocomplete
            id="to"
            placeHolder="To"
            airports={testAirports}
            handleSelectOption={handleSelectTo}
          />
        </div>
        <div>
          <FlightResults flights={filteredFlights} />
        </div>
      </main>
    </>
  );
};

export default memo(Home);
