import React from "react";
import instructions from "../data/basic-instructions";

const PopupBody = () => {
  return (
    <>
      <header className="w-full flex flex-col justify-center items-center p-3 gap-1">
        <h1 className="text-2xl font-semibold">LinkedIn AI Reply</h1>
        <p className="text-sm text-slate-500 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, maiores.
        </p>
      </header>
      <Instructions />
    </>
  );
};

const Instructions = () => {
  const [notLinkedIn, setNotLinkedIn] = React.useState(false);
  return (
    <article className="w-full">
      {notLinkedIn ? (
        <p className="w-full text-center text-red-500 text-base">
          Extension only works in linkedIn
        </p>
      ) : (
        <ol className="w-full list-inside list-decimal text-base p-3">
          {instructions.map((instruction, index) => {
            return <li key={index}>{instruction}</li>;
          })}
        </ol>
      )}
    </article>
  );
};

export default PopupBody;
