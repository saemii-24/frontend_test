import React, { useState } from "react";
import { Modal } from "./Modal";

export const UseModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button title="button" onClick={handleOpenModal}>
        모달 열기
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
