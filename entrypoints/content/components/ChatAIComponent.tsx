import BounceLoader from "@/ui/bounce-loader";
import { useEffect, useRef } from "react";

type ChatAIComponentProps = {
  chats: Chat[];
  loadingState: boolean;
};

const ChatAIComponent = ({ chats, loadingState }: ChatAIComponentProps) => {
  const chatBodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chats]);
  return (
    <section
      className={`w-full flex flex-col gap-4 px-3 overflow-auto`}
      role="log"
      aria-live="polite"
      ref={chatBodyRef}
    >
      {chats.map((chat, index) => {
        if (chat.author.toLowerCase() === "user") {
          return (
            <ChatMessage author={chat.author} text={chat.text} key={index} />
          );
        } else {
          return (
            <ChatReply author={chat.author} text={chat.text} key={index} />
          );
        }
      })}
      {loadingState && <ChatReply text={<BounceLoader />} author="AI" />}
    </section>
  );
};

export type Chat = {
  text: string;
  author: string;
};

const ChatMessage = ({ text }: Chat) => {
  return (
    <div className="max-w-[80%] self-end flex flex-col justify-center items-center rounded-2xl p-4 pt-3 bg-gray-300 animate-pop-in">
      <p className="text-start whitespace-pre-wrap">{text}</p>
    </div>
  );
};

const ChatReply = ({ text }: { text: React.ReactNode; author: string }) => {
  return (
    <div className="max-w-[80%] self-start flex flex-col justify-center items-center rounded-2xl p-4 pt-3 bg-[#DBEAFE] animate-pop-in">
      <p className="text-start whitespace-pre-wrap">{text}</p>
    </div>
  );
};

export default ChatAIComponent;
