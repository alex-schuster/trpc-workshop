import type { Airport } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { memo, useContext, useState } from "react";
import Autocomplete from "~/components/Autocomplete";
import FlightResults from "~/components/FlightResults";
import { api } from "~/utils/api";
import NameModal from "~/components/PassengerModal";
import type { CreatePassengerInput } from "~/server/api/routers/passengers";
import PassengerContext from "~/context/passengerContext";
import { useRouter } from "next/router";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();
  const [from, setFrom] = useState<Airport | null>(null);
  const [to, setTo] = useState<Airport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createPassenger = api.passengers.create.useMutation();
  const { passenger: currentPassenger, setPassenger } =
    useContext(PassengerContext);
  const { data: availableAirports } = api.airports.findAirports.useQuery();
  const { data: filteredFlights } = api.flights.filterFlights.useQuery(
    {
      originCode: from ? from.code : undefined,
      destinationCode: to ? to.code : undefined,
    },
    // Query nur ausführen, wenn mindestens ein Wert gesetzt ist
    { enabled: !!from || !!to }
  );
  console.log(currentPassenger);

  const handleSelectFrom = (airport: Airport | null) => {
    setFrom(airport);
  };

  const handleSelectTo = (airport: Airport | null) => {
    setTo(airport);
  };

  const handleCreatePassenger = async ({
    surname,
    givenName,
  }: CreatePassengerInput) => {
    const newPassenger = await createPassenger.mutateAsync({
      surname,
      givenName,
    });
    setPassenger(newPassenger);
  };

  const navigateToMyBookings = () => {
    if (!currentPassenger) return;
    console.log(router);
  };

  return (
    <>
      <Head>
        <title>Flight Finder</title>
        <meta name="description" content="Flight Finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-4 md:m-10">
        <h1 className="mb-10 text-center text-4xl font-bold">Flight Finder</h1>
        <div id="userdata" className="fixed right-4 top-4">
          {!currentPassenger ? (
            <button
              className="btn-primary rounded-md p-3"
              onClick={() => setIsModalOpen(true)}
            >
              Jetzt Daten angeben
            </button>
          ) : (
            <div className="flex flex-row gap-10">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">Logged in as:</p>
                <p className="text-xl">
                  {currentPassenger.givenName} {currentPassenger.surname}
                </p>
              </div>
              <div className="mt-2">
                <button
                  className="btn-primary rounded-md p-3"
                  onClick={() => navigateToMyBookings()}
                >
                  <Link
                    href={{
                      pathname: "/bookings",
                    }}
                  >
                    My Bookings
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="justify-evenl  flex flex-row gap-2">
          <Autocomplete
            id="from"
            placeHolder="From"
            airports={availableAirports}
            handleSelectOption={handleSelectFrom}
          />
          <Autocomplete
            id="to"
            placeHolder="To"
            airports={availableAirports}
            handleSelectOption={handleSelectTo}
          />
        </div>
        <div>
          <FlightResults
            noInput={!from && !to}
            flights={filteredFlights}
            toggleModal={(isOpen) => setIsModalOpen(isOpen)}
          />
        </div>

        <NameModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={async ({ surname, givenName }) => {
            await handleCreatePassenger({
              surname,
              givenName,
            });
            setIsModalOpen(false);
          }}
        />
      </main>
    </>
  );
};

export default memo(Home);
