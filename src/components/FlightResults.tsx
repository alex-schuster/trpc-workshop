import type { Flight } from "@prisma/client";
import FlightElement from "./FlightElement";

type FlightResultsProps = {
  noInput: boolean;
  flights: Flight[] | undefined;
};

const FlightResults = ({ noInput, flights }: FlightResultsProps) => {
  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold text-white">Available Flights:</h1>
      <div className="mt-10">
        {flights?.length ? (
          <ul>
            {flights?.map((flight) => (
              <FlightElement key={flight.id} flight={flight} />
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
