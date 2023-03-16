import React from "react";
import type { Flight } from "@prisma/client";
import moment from "moment";

type FlightProps = {
  flight: Flight;
};

const FlightElement: React.FC<FlightProps> = ({ flight }) => {
  // bookFlight procedure hier
  const bookFlight = (flight: Flight) => {
    console.log("bookFlight", flight);
  };

  return (
    <li>
      <div className="card rounded-box my-4 bg-slate-900 text-white">
        <div className="card-body flex flex-row items-center justify-center">
          <div className="flex w-1/5 flex-col">
            <span className="badge-primary badge">{flight.flightNumber}</span>
            <div className="flex flex-row justify-center text-4xl">
              <div className="from mr-10 flex flex-col justify-center">
                <span>Date:</span>
                <span>{moment(flight.departureAt).format("dd.mm.yyyy")}</span>
              </div>
            </div>
          </div>
          <div className="flex w-3/5 flex-col">
            <div className="flex flex-row justify-center text-4xl">
              <div className="from flex flex-col justify-center text-center">
                <span>{flight.originId}</span>
                <span>{moment(flight.departureAt).format("HH:mm")}</span>
              </div>
              <div className="from mx-10 flex flex-col justify-center text-center">
                -
              </div>
              <div className="to flex flex-col justify-center text-center">
                <span>{flight.destinationId}</span>
                <span>{moment(flight.arrivalAt).format("HH:mm")}</span>
              </div>
            </div>
          </div>
          <div className="w-1/5 text-2xl">
            <div className="to flex flex-col justify-center text-center">
              <span>Flight Time:</span>
              <span>
                {moment
                  .duration(
                    moment(flight.arrivalAt).diff(moment(flight.departureAt))
                  )
                  .humanize()}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-end text-center">
            <span className="mb-2 text-xl font-bold">{flight.price} €</span>
            <button
              className="btn-primary btn"
              onClick={() => bookFlight(flight)}
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FlightElement;
