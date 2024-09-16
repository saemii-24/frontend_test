import React from "react";

export const Modal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      className="top-0 absolute h-screen w-screen bg-[rgba(0,0,0,0.3)]"
    >
      <h1>모달 이랍니다!</h1>
      <button className="h-6 w-10 bg-red-500" type="button" onClick={onClose}>
        닫기
      </button>
    </div>
  );
};
