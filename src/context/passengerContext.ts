import type { Passenger } from "@prisma/client";
import { createContext } from "react";

type PassengerContextType = {
  passenger: Passenger | null;
  setPassenger: (passenger: Passenger | null) => void;
};

const PassengerContext = createContext<PassengerContextType>({
  passenger: null,
  setPassenger: () => {
    null;
  },
});

export default PassengerContext;
