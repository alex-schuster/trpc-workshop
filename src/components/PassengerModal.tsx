import type { Passenger } from "@prisma/client";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-modern-modal";
import type { CreatePassengerInput } from "~/server/api/routers/passengers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: ({ surname, givenName }: CreatePassengerInput) => Promise<void>;
};

const NameModal = ({ isOpen, onClose, onSave }: Props) => {
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");

  const handleSave = async () => {
    await onSave({
      surname,
      givenName,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdropBlur={true}>
      <ModalHeader className="bg-slate-900">Please enter your name</ModalHeader>
      <ModalBody className="bg-slate-900">
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-white"
            htmlFor="givenName"
          >
            Given Name
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-white shadow focus:outline-none"
            id="givenName"
            type="text"
            placeholder="Enter your given name"
            value={givenName}
            onChange={(e) => setGivenName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold text-white" htmlFor="surname">
            Surname
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-white shadow focus:outline-none"
            id="surname"
            type="text"
            placeholder="Enter your surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
      </ModalBody>
      <ModalFooter className="bg-slate-900">
        <button
          className="btn-primary btn mr-2"
          onClick={() => {
            void handleSave();
          }}
        >
          Save
        </button>
        <button className="btn-secondary btn" onClick={onClose}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default NameModal;
