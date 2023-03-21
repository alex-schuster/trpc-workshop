import type { Flight } from "@prisma/client";
import moment from "moment";
import React from "react";

type FlightProps = {
  flight: Flight;
  handleFlight: (flight: Flight) => void;
  bookable: boolean;
};

const FlightElement: React.FC<FlightProps> = ({
  flight,
  handleFlight,
  bookable,
}) => {
  return (
    <div className="card mb-4 bg-slate-800 p-4 hover:cursor-pointer hover:bg-slate-900">
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1">
          <p className="text-xl font-bold">
            <span className=" chip hidden rounded-md bg-primary py-1 px-2 font-bold text-white md:inline">
              {flight.flightNumber}
            </span>
            <span className="chip rounded-md bg-primary py-1 px-2 font-bold  text-white md:hidden">
              {flight.flightNumber}
            </span>
          </p>
          <br />
          <p className="text-gray-500 md:hidden">{flight.originId}</p>
          <p className="text-gray-500">
            {moment(flight.departureAt).format("LT")} -{" "}
            {moment(flight.arrivalAt).format("LT")}
          </p>
        </div>
        <div className="col-span-1 hidden md:block">
          <p className="text-3xl font-bold">{flight.originId}</p>
          <p className="text-gray-500">to</p>
          <p className="text-3xl font-bold">{flight.destinationId}</p>
        </div>
        <div className="col-span-1">
          <p className="text-2xl font-bold">
            Capacity:{" "}
            <span className="font-normal">
              {flight.capacity} / {flight.capacity}
            </span>
          </p>
          <p className="text-gray-500 md:hidden">{flight.destinationId}</p>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <p className="text-gray-500">Price:</p>
          <p className="ml-2 text-xl font-bold">{flight.price}€</p>
          <button
            className="btn-primary btn ml-4"
            onClick={() => handleFlight(flight)}
          >
            {bookable ? "Book now" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightElement;
