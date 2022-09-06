import React from "react";
import Image from "next/image";
const ConsoleContainer = ({ handleCompile, handleSubmit, loading }: any) => {
  return (
    <section>
      <div className="bg-[#232323] text-center px-4 w-full h-[4rem] min-h-[4rem] flex justify-between whitespace-nowrap items-center">
        <div className="flex gap-6 justify-center items-center">
          {/* Compile the Program with the user given input */}
          <button
            className="bg-[#141414] cursor-pointer text-center text-white font-bold px-4 py-2 rounded-md"
            onClick={() => handleCompile()}
          >
            Compile & Run
          </button>
          {/* Submit the Program */}
          <button
            className="bg-[#141414] text-white text-center font-bold px-4 py-2 rounded-md"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>

          {loading && (
            <div className="h-20 w-20 relative">
              <Image src={"/Asserts/loading.svg"} layout="fill" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConsoleContainer;
