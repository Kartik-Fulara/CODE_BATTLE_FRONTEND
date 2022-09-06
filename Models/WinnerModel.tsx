import React from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRouter } from "next/router";
const WinnerModal = ({ isOpen, closeModal, message }: any) => {
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      if (isOpen) {
        router.push("/");
      }
    }, 5000);
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#232323] bg-opacity-[1] z-10" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-20">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-[100%] w-[100%] flex  justify-center items-center ">
                <div className="flex flex-col justify-between pb-[3rem] pt-[1.5rem] gap-[6] rounded-lg items-center h-[20rem] w-[30rem] bg-black">
                  <section className="flex w-full justify-center items-center h-fit">
                    <h2 className="text-4xl text-white font-semibold shadow-lg z-[1]  top-4 left-4">
                      CODING
                    </h2>
                    <div className="relative h-[6rem] w-[8rem]">
                      <Image src={"/Asserts/battleIco.png"} layout="fill" />
                    </div>
                    <h2 className="text-4xl text-white font-semibold shadow-lg z-[1]  top-4 left-4">
                      BATTLE!!
                    </h2>
                  </section>
                  <h1
                    className={`text-6xl font-semibold font-serif leading-6 ${
                      message === "" ? "text-yellow-500" : "text-green-500"
                    }`}
                  >
                    {message === "" ? "DRAW" : "WINNER"}
                  </h1>
                  {message !== "" && (
                    <div className="text-4xl font-bold font-sans italic uppercase text-white">
                      {message}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WinnerModal;
