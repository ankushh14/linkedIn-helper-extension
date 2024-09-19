import { MagicPen } from "@/assets/icons";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type CreateHelperButtonProps = {
  container: HTMLElement;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateHelperButton = ({
  container,
  setModal,
}: CreateHelperButtonProps) => {
  useEffect(() => {
    if (
      container.style.position !== "relative" &&
      container.style.position !== "absolute" &&
      container.style.position !== "fixed"
    ) {
      container.style.position = "relative";
    }
  }, [container]);
  const handleClick = () => {
    setModal(true);
  };
  return (
    container &&
    createPortal(
      <button
        className="bg-white rounded-full p-1 m-1"
        type="button"
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "8px",
          margin: "4px",
          borderRadius: "9999px",
          position: "absolute",
          right: "0",
          bottom: "0",
          boxShadow: "5px 5px 10px #0000001A",
        }}
        title="Generate AI response"
        onClick={handleClick}
      >
        <MagicPen />
      </button>,
      container
    )
  );
};

export default CreateHelperButton;
