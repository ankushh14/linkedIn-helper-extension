import { ArrowDown, ArrowRight, RegenerateIcon } from "@/assets/icons";
import { LINKEDIN_PLACEHOLDER_CLASS } from "@/constants";
import Button from "@/ui/button";
import { getResponse } from "@/utils/generatedummyresponse";
import { FormEvent, useState } from "react";
import ChatAIComponent, { Chat } from "./ChatAIComponent";

const PromptModalBody = ({
  messageContainerRef,
  setModal,
}: Readonly<{
  messageContainerRef: React.MutableRefObject<HTMLElement | undefined>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}>) => {
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const [secondaryBtns, setSecondaryBtns] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.length) {
      return;
    }
    setChats((prev) => [...prev, { text: inputValue, author: "user" }]);
    setInputValue("");
    setLoading(true);
    const response = await getResponse({
      text: inputValue,
    });
    if (response) {
      setLoading(false);
      setSecondaryBtns(true);
      setGeneratedResponse(response.text);
      setChats((prev) => [...prev, response]);
    }
  };

  const InjectTextHandler = () => {
    messageContainerRef.current?.parentElement?.lastElementChild?.classList.remove(
      LINKEDIN_PLACEHOLDER_CLASS
    );
    messageContainerRef.current!.firstElementChild!.innerHTML =
      generatedResponse;
    setChats([]);
    setSecondaryBtns(false);
    setGeneratedResponse("");
    messageContainerRef.current?.focus();
    setModal(false);
  };

  return (
    <article
      className="w-full max-w-[600px] max-h-[100vh] bg-modalBg rounded-2xl flex flex-col items-center p-7 gap-4 text-gray-500"
      onClick={(e) => e.stopPropagation()}
    >
      <ChatAIComponent chats={chats} loadingState={loading} />
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-end gap-4"
      >
        <input
          type="text"
          className="w-full border border-gray-300 focus:border-gray-500 placeholder:text-gray-300 p-3 outline-none rounded-md"
          placeholder="Your prompt here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SecondaryBtns
          injectHandler={InjectTextHandler}
          showBtns={secondaryBtns}
        />
        <Button
          type="submit"
          className={`w-fit justify-center items-center gap-3  ${secondaryBtns ? "hidden" : "flex"}`}
          disabled={loading}
        >
          <ArrowRight width="15" height="15" />
          Generate
        </Button>
      </form>
    </article>
  );
};

type SecondaryBtnsProps = {
  injectHandler: () => void;
  showBtns: boolean;
};

const SecondaryBtns = ({ injectHandler, showBtns }: SecondaryBtnsProps) => {
  return (
    <div className={`gap-4 justify-center items-center flex`}>
      <Button
        variant="outline"
        type="button"
        className={`w-fit justify-center items-center gap-2 ${showBtns ? "flex" : "hidden"}`}
        onClick={injectHandler}
      >
        <ArrowDown width="15" height="15" />
        Insert
      </Button>
      <Button
        type="button"
        disabled
        className={`w-fit flex justify-center items-center gap-1 ${showBtns ? "flex" : "hidden"}`}
      >
        <RegenerateIcon width="15" height="15" />
        Regenerate
      </Button>
    </div>
  );
};

export default PromptModalBody;
