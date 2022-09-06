import React from "react";

const QuestionsContainer = ({ question, output }: any) => {
  return (
    <section className="relative overflow-scroll lg:overflow-hidden flex text-white flex-col w-full h-full gap-3 p-4 justify-start items-start ">
      {/* Question Full Info */}
      <section className="flex p-4 gap-4 flex-col w-full  h-full max-h-[90%]">
        <section className="text-xl py-4 font-bold border-b-[1px] border-white">
          {question?.title}
        </section>
        <div className="flex flex-col gap-4">
          {question?.content?.map((content: any) => (
            <p className="text-xl">{content.text}</p>
          ))}
        </div>
        {/* Given Input and Output */}
        <section className="flex flex-col gap-4 w-[80%] h-fit">
          <div className="flex flex-col gap-3">
            <div className="text-xl font-bold">Input</div>
            <div className="text-xl flex flex-col pl-4 pb-2 h-fit w-full justify-center bg-[#232323]">
              <span>nums = {question?.input[0]?.nums}</span>
              {question?.input[0]?.target && (
                <span>target = {question?.input[0]?.target}</span>
              )}
            </div>
          </div>
          {output?.output && (
            <div className="flex flex-col gap-3">
              <div className="text-xl font-bold">Your Output</div>
              <div className="text-xl flex flex-col pl-4 pb-2 h-fit w-full justify-center bg-[#232323]">
                <span>{output?.output}</span>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div className="text-xl font-bold">Expected Output</div>
            <div className="text-xl flex flex-col pl-4 pb-2 h-fit w-full justify-center bg-[#232323]">
              <span>{question?.output[0]?.desiredOutput!}</span>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default QuestionsContainer;
