import { type AppType } from "next/app";
import PassengerContext from "~/context/passengerContext";
import type { Passenger } from "@prisma/client";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useState } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [passenger, setPassenger] = useState<Passenger | null>(null);

  const handleSetPassenger = (newPassenger: Passenger | null) => {
    if (newPassenger) setPassenger(newPassenger);
  };

  return (
    <PassengerContext.Provider
      value={{ passenger, setPassenger: handleSetPassenger }}
    >
      <Component {...pageProps} />
    </PassengerContext.Provider>
  );
};

export default api.withTRPC(MyApp);
