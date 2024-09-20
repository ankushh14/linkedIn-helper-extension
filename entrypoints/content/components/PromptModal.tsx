import React from "react";
import PromptModalBody from "./PromptModalBody";

type PromptModalProps = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PromptModal = ({ modal, setModal }: PromptModalProps) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const messageContainerRef = React.useRef<HTMLElement>();

  const closeModal = () => {
    setModal(false);
  };

  const handleExitOnEscape = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === "escape") {
      closeModal();
    }
  };

  React.useEffect(() => {
    addEventListener("keydown", handleExitOnEscape);
    return () => removeEventListener("keydown", handleExitOnEscape);
  });

  React.useEffect(() => {
    if (modal) {
      const modalElement = modalRef.current;

      const handleFocusTrap = (e: KeyboardEvent) => {
        const focusableElements = modalRef?.current?.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      if (document.activeElement instanceof HTMLElement) {
        const helperButton = document.activeElement as HTMLElement;
        messageContainerRef.current = helperButton.previousElementSibling
          ?.firstElementChild as HTMLElement;
      }

      const focusableElements = modalElement?.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      if (focusableElements.length) {
        focusableElements[0].focus();
      }

      window.addEventListener("keydown", handleFocusTrap);
      return () => {
        window.removeEventListener("keydown", handleFocusTrap);
      };
    }
  }, [modal]);

  return (
    <div
      className={`w-full fixed z-[9999] bg-[#0D0D1233] top-0 left-0 right-0 bottom-0 justify-center items-center ${modal ? "flex" : "hidden"}`}
      onClick={closeModal}
      role="dialog"
      aria-modal={modal ? "true" : "false"}
      ref={modalRef}
    >
      <PromptModalBody
        messageContainerRef={messageContainerRef}
        setModal={setModal}
      />
    </div>
  );
};

export default PromptModal;
