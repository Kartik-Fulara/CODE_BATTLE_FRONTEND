import React from "react";
import Image from "next/image";
// import load from ""

const LoadingModel = ({ message }: any) => {
  return (
    <div
      className="flex 
    justify-center
    items-center
    h-screen w-screen
    relative
    gap-4
    bg-black
    "
    >
      <div className="h-20 w-20 relative">
        <Image src={"/Asserts/loading.svg"} layout="fill" />
      </div>
      <span className="text-white text-2xl">{message}</span>
    </div>
  );
};

export default LoadingModel;
