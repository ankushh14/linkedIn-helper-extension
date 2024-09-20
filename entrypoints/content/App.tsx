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
    const handleFocusIn = (event: Event) => {
      const target = event.target as HTMLElement;
      const container = target.closest(LINKEDIN_MSG_CONTAINER) as HTMLElement;
      if (container) {
        setFocusedElement(container);
      } else {
        setFocusedElement(null);
      }
    };

    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
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
