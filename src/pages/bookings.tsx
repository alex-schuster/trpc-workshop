import React, { useContext } from "react";
import FlightElement from "~/components/FlightElement";
import PassengerContext from "~/context/passengerContext";
import { api } from "~/utils/api";
import type { Flight } from "@prisma/client";

function MyBookings() {
  const { passenger: currentPassenger } = useContext(PassengerContext);
  const { data: myBookings, refetch: refetchBookings } =
    api.flights.getMyFlights.useQuery(
      {
        passengerId: currentPassenger!.id,
      },
      { enabled: !!currentPassenger }
    );
  const cancelFlightMutation = api.flights.cancelFlight.useMutation({
    onSuccess: () => {
      alert("Flight cancelled!");
      void refetchBookings();
    },
  });

  const handleCancelFlight = (flight: Flight) => {
    if (!currentPassenger) return;
    void cancelFlightMutation.mutateAsync({
      passengerId: currentPassenger.id,
      flightId: flight.id,
    });
  };

  return (
    <main className="m-4 md:m-10">
      <h1 className="mb-10 text-center text-4xl font-bold">My Bookings</h1>
      <div className="flex flex-col items-center">
        {myBookings?.map((flight) => (
          <FlightElement
            key={flight.id}
            flight={flight}
            handleFlight={() => handleCancelFlight(flight)}
            bookable={false}
          />
        ))}
      </div>
    </main>
  );
}

export default MyBookings;
