import { CHAT_REPLY } from "@/constants";
import { Chat } from "@/entrypoints/content/components/ChatAIComponent";

export const getResponse = async ({
  text,
}: {
  text: string;
}): Promise<Chat> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: CHAT_REPLY,
        author: "AI",
      });
    }, 3000);
  });
};
