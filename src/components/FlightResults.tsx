import type { Flight } from "@prisma/client";
import { useContext } from "react";
import PassengerContext from "~/context/passengerContext";
import { api } from "~/utils/api";
import FlightElement from "./FlightElement";

type FlightResultsProps = {
  noInput: boolean;
  flights: Flight[] | undefined;
  toggleModal: (isOpen: boolean) => void;
};

const FlightResults = ({
  noInput,
  flights,
  toggleModal,
}: FlightResultsProps) => {
  const bookFlightMutation = api.flights.bookFlight.useMutation({
    onSuccess: () => {
      alert("Flight booked!");
    },
  });
  const { passenger: currentPassenger } = useContext(PassengerContext);

  const openModalOrBookFlight = (flight: Flight) => {
    if (!currentPassenger) {
      toggleModal(true);
    } else {
      bookFlight(flight);
    }
  };

  const bookFlight = (flight: Flight) => {
    if (!currentPassenger) return;
    void bookFlightMutation.mutateAsync({
      passengerId: currentPassenger.id,
      flightId: flight.id,
    });
  };

  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold text-white">Available Flights:</h1>
      <div className="mt-10">
        {flights?.length ? (
          <ul>
            {flights?.map((flight) => (
              <FlightElement
                key={flight.id}
                flight={flight}
                handleFlight={() => openModalOrBookFlight(flight)}
                bookable={true}
              />
            ))}
          </ul>
        ) : noInput ? (
          <p className="text-xl">Please enter a flight</p>
        ) : (
          <p className="text-xl">No flights found!</p>
        )}
      </div>
    </div>
  );
};

export default FlightResults;
