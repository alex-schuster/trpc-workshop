import type { Flight } from "@prisma/client";
import FlightElement from "./FlightElement";

type FlightResultsProps = {
  flights: Flight[];
};

const FlightResults = ({ flights }: FlightResultsProps) => {
  return (
    <div className="mt-10">
      <h1 className="text-2xl">Possible Flights:</h1>
      <div className="mt-5">
        <ul>
          {flights.map((flight) => (
            <FlightElement key={flight.id} flight={flight} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightResults;
