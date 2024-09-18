import React from "react";

const App = () => {
  const [count, setCount] = React.useState(1);
  const increment = () => setCount((count) => count + 1);

  return (
    <div className="bg-red-500">
      <p>This is React. {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default App;
