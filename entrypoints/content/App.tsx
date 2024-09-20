import { LINKEDIN_MSG_CONTAINER } from "@/constants";
import { useEffect, useState } from "react";
import CreateHelperButton from "./components/CreateHelperButton";
import PromptModal from "./components/PromptModal";

const App = () => {
  const [modal, setModal] = useState(false);
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    // handles when input text field is focused
    const handleFocusIn = (event: Event) => {
      const target = event.target as HTMLElement;
      const container = target.closest(LINKEDIN_MSG_CONTAINER) as HTMLElement;
      if (container) {
        setFocusedElement(container);
      }
    };

    // handles when input text field moves out of focus
    const handleFocusOut = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const container = target.closest(LINKEDIN_MSG_CONTAINER) as HTMLElement;
      const relatedTarget = event.relatedTarget as HTMLElement;
      if (container && (!relatedTarget || !container.contains(relatedTarget))) {
        setFocusedElement(null);
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <>
      {focusedElement && (
        <CreateHelperButton container={focusedElement} setModal={setModal} />
      )}
      <PromptModal modal={modal} setModal={setModal} />
    </>
  );
};

export default App;
