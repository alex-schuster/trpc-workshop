import type { Airport, Flight } from "@prisma/client";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

type AutocompleteProps = {
  id: string;
  airports: Airport[] | undefined;
  placeHolder?: string;
  handleSelectOption: (value: Airport | null) => void;
};

const Autocomplete = ({
  id,
  airports,
  placeHolder,
  handleSelectOption,
}: AutocompleteProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("open", open);
  }, [open]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (!value) {
      setFilteredAirports([]);
      handleSelectOption(null);
      return;
    }
    filterAirports(value);
    setOpen(true);
  };

  const filterAirports = (value: string) => {
    const filteredAirports = airports?.filter((airport) => {
      return airport.code.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredAirports(filteredAirports || []);
  };

  useEffect(() => {
    setFilteredAirports([]);
    setOpen(false);
  }, [handleSelectOption]);

  return (
    <div
      className={classNames({
        "dropdown w-full": true,
      })}
      ref={ref}
    >
      <label htmlFor={id}>
        <span className="label-text">{placeHolder}</span>
      </label>
      <input
        type="text"
        id={id}
        className="input-bordered input w-full"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeHolder ? placeHolder : "Type something..."}
        tabIndex={0}
      />
      <div
        className="dropdown-content top-20 max-h-96 flex-col overflow-auto rounded-md bg-base-200"
        // style={{ display: open ? "block" : "none" }}
      >
        <ul
          className="menu menu-compact "
          style={{ width: ref.current?.clientWidth }}
        >
          {filteredAirports.map((airport, index) => {
            return (
              <li
                key={index}
                tabIndex={index + 1}
                onClick={() => {
                  setOpen(false);
                }}
                className="w-full border-b border-b-base-content/10"
              >
                <button
                  onClick={() => {
                    setInputValue(airport.code);
                    handleSelectOption(airport);
                  }}
                >
                  <span className="w-8 font-bold">{airport.code}</span>
                  <span className="text-base-content/50">{airport.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
