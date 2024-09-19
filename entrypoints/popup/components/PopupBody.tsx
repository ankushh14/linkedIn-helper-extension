import { DESCRIPTION, INSTRUCTIONS } from "@/constants";
import React from "react";

const PopupBody = () => {
  return (
    <>
      <header className="w-full flex flex-col justify-center items-center p-3 gap-1">
        <h1 className="text-2xl font-semibold">LinkedIn AI Reply</h1>
        <p className="text-sm text-slate-500 text-center">{DESCRIPTION}</p>
      </header>
      <Instructions />
    </>
  );
};

const Instructions = () => {
  const [notLinkedIn, setNotLinkedIn] = React.useState(false);

  const checkUrl = React.useCallback(async () => {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tabs[0].url?.includes("linkedin")) {
      setNotLinkedIn(true);
    }
  }, [setNotLinkedIn]);

  React.useEffect(() => {
    checkUrl();
  }, [checkUrl]);

  return (
    <article className="w-full">
      {notLinkedIn ? (
        <>
          <p className="w-full text-center text-red-500 text-base">
            Extension only works in linkedIn
          </p>
          <span className="w-full flex justify-center items-center">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="text-blue-600 underline text-base"
            >
              https://www.linkedin.com/
            </a>
          </span>
        </>
      ) : (
        <ol className="w-full list-inside list-decimal text-sm p-3">
          {INSTRUCTIONS.map((instruction, index) => {
            return (
              <li key={index} className="py-2">
                {instruction}
              </li>
            );
          })}
        </ol>
      )}
    </article>
  );
};

export default PopupBody;
