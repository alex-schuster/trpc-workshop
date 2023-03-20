import type { Airport, Flight } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { memo, useEffect, useState } from "react";
import Autocomplete from "~/components/Autocomplete";
import FlightResults from "~/components/FlightResults";
import { testAirports, testFlights } from "~/testData";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [from, setFrom] = useState<Airport | null>(null);
  const [to, setTo] = useState<Airport | null>(null);
  const { data: availableAirports } = api.airports.findAirports.useQuery();
  const { data: filteredFlights } = api.flights.filterFlights.useQuery({
    originCode: from ? from.code : undefined,
    destinationCode: to ? to.code : undefined,
  });

  const handleSelectFrom = (airport: Airport | null) => {
    setFrom(airport);
  };

  const handleSelectTo = (airport: Airport | null) => {
    setTo(airport);
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Checkfelix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-4 md:m-10">
        <h1 className="mb-10 text-center text-4xl font-bold">Flight Finder</h1>
        <div className="justify-evenl  flex flex-row gap-2">
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
          <FlightResults noInput={!from && !to} flights={filteredFlights} />
        </div>
      </main>
    </>
  );
};

export default memo(Home);
