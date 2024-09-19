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
      if (target && target.matches(LINKEDIN_MSG_CONTAINER)) {
        setFocusedElement(target);
      }
    };

    const handleFocusOut = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && !target.matches(LINKEDIN_MSG_CONTAINER)) {
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
