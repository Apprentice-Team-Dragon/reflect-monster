import { useState } from "react";

export default function useModal() {
  const [modalStatus, setModalStatus] = useState(false);

  const openModal = () => {
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  return {
    modalStatus,
    closeModal,
    openModal,
  };
}
