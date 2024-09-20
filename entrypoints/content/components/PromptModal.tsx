import React from "react";
import PromptModalBody from "./PromptModalBody";

type PromptModalProps = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PromptModal = ({ modal, setModal }: PromptModalProps) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Target input text field ref
  const messageContainerRef = React.useRef<HTMLElement>();

  const closeModal = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.focus();
    }
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
  }, []);

  React.useEffect(() => {
    if (modal) {
      const handleFocusTrap = (e: KeyboardEvent) => {
        const allFocusableElements = modalRef?.current?.querySelectorAll(
          'a[href], button:not(:disabled), textarea:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;

        // Filter elements having classname "hidden"
        const focusableElements = [...allFocusableElements].filter(
          (el) => !el.classList.contains("hidden")
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // handle tab key
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (
              document.activeElement?.shadowRoot &&
              document.activeElement.shadowRoot.activeElement === firstElement
            ) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (
              document.activeElement?.shadowRoot &&
              document.activeElement.shadowRoot.activeElement === lastElement
            ) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      // Store input text field ref into messageContainerRef
      if (document.activeElement instanceof HTMLElement) {
        const helperButton = document.activeElement as HTMLElement;
        messageContainerRef.current = helperButton.previousElementSibling
          ?.firstElementChild as HTMLElement;
      }

      // Focus on first element in modal when opened
      const focusableElements = modalRef.current?.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      if (focusableElements && focusableElements.length) {
        focusableElements[0].focus();
      }

      modalRef.current?.addEventListener("keydown", handleFocusTrap);
      return () => {
        modalRef.current?.removeEventListener("keydown", handleFocusTrap);
      };
    }
  }, [modal]);

  if (!modal) {
    return null;
  }

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
