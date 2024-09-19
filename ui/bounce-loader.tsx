const BounceLoader = () => {
  const spanStyles = `w-3 h-3 bg-[#9b59b6] mx-1 animate-bounce duration-300 rounded-full`;
  return (
    <span className="w-fit flex justify-center items-center">
      <span
        className={cn(spanStyles, "")}
        style={{
          animationDelay: "100ms",
        }}
      ></span>
      <span
        className={cn(spanStyles, "delay-75")}
        style={{
          animationDelay: "200ms",
        }}
      ></span>
      <span
        className={cn(spanStyles, "delay-100")}
        style={{
          animationDelay: "300ms",
        }}
      ></span>
    </span>
  );
};

export default BounceLoader;
