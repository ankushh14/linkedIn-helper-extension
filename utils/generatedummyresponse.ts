import { CHAT_REPLY } from "@/constants";
import { Chat } from "@/entrypoints/content/components/ChatAIComponent";

/**
 * Simulates an asynchronous response from a chat system after a delay.
 *
 * @param {Object} params - The input parameters.
 * @param {string} params.text - The text input to be processed by the function.
 * @returns {Promise<Chat>} A promise that resolves to a Chat object containing the reply text and author information.
 *
 */

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
