import { useRef, useEffect, useState, ReactNode } from "react";

type Props = {
  isOpen: boolean;
  hasCloseBtn: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const ModalExercise = ({
  isOpen,
  hasCloseBtn = true,
  onClose,
  children,
}: Props) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement: any = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className="m-auto rounded-xl border-2 border-ww-red bg-ww-silverfrost-700 p-4"
    >
      {hasCloseBtn && (
        <div className=" text-right  ">
          <button
            type="button"
            onClick={handleCloseModal}
            className="rounded-full border-2 border-ww-red px-2 text-lg font-semibold text-black hover:font-bold"
          >
            X
          </button>
        </div>
      )}
      {children}
    </dialog>
  );
};
