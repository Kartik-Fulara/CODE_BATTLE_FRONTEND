import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useChannelMessage, useConnectionState } from "@onehop/react";
import EditorContainer from "../Components/Editor";
import QuestionsContainer from "../Components/Questions";
import ConsoleContainer from "../Components/Console";
import { useInit } from "@onehop/react";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import LoadingModel from "../Models/LoadingModel";
import WinnerModal from "../Models/WinnerModel";

const url = process.env.NEXT_PUBLIC_URL;

const Match = ({ channelToken, channelID, question }: any) => {
  // All States
  const [gameState, setGameState] = useState(true);
  const [canSend, setSend] = useState(false); // Send Code to the server
  const [output, setOutput] = useState(null); // Store the output from the server
  const [timer, setTimer] = useState(0); //Timer State
  const [winner, setWinner] = useState("");
  const [code, setCode] = useState("");
  const [isOpen, setOpen] = useState(false); // modal State
  const [loading, setLoading] = useState(false);

  // handleModal
  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }
  //Initializing the Channel
  useInit({
    projectId: "project_NDk1NTA2Mzg5MzMzMDMzMDE",
    token: channelToken,
  });
  const connection = useConnectionState(); //Hook to Check HOP connection

  //Calling the API to Start the Timer
  useEffect(() => {
    const startGame = async () => {
      await axios.post(`${url}game/start`, {
        channelID,
        channelToken,
      });
    };
    startGame();
  }, []);

  const getCode = (code: any) => {
    let regex = /[\r\n\x0B\x0C\u0085\u2028\u2029]+/g;
    let result = code.replace(regex, "\n");
    setCode(result);
  };

  const handleCompile = async () => {
    setLoading(true);

    const res: any = await axios.post(`${url}game/check-code`, {
      input: {
        input: JSON.parse(question)?.input[0]?.nums,
        target: JSON.parse(question)?.input[0]?.target,
      },
      code,
      desiredOutput: JSON.parse(question)?.output[0]?.desiredOutput,
    });
    setOutput(res.data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    //Submit the code
    const res: any = await axios.post(`${url}game/submit`, {
      channelID,
      channelToken,
      username: getCookie("username"),
    });
    setOutput(res.data);
  };

  //HOP Hook to get the the TIMER
  useChannelMessage(channelID, "COUNTER", async (data: any) => {
    const prevMessage = data.message - 1;
    setTimer(prevMessage);
  });

  useChannelMessage(channelID, "WINNER", async (data: any) => {
    // const prevMessage = parseInt(data.message) - 1
    setWinner(data.winner);
    if (data.message === "STOP!") {
      setGameState(false); //TODO: use this state to determine game end
      setSend(false);
      openModal();
      clearCookies();
    }
  });

  //Clearing Cookies after Game END
  const clearCookies = () => {
    deleteCookie("channelToken");
    deleteCookie("channelID");
    deleteCookie("question");
    localStorage.removeItem("question");
  };

  if (connection !== "connected") {
    //TODO: Add Modal Loading, before we connect to HOP
    return <LoadingModel message="Creating a Session..." />;
  }

  return (
    <main className="flex  h-screen relative w-screen bg-[#141414] flex-col overflow-scroll sm:overflow-hidden items-center justify-center gap-2 ">
      <Head>
        <title>Coding Match</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WinnerModal isOpen={isOpen} closeModal={closeModal} message={winner} />
      <section className="flex text-white absolute px-6 w-full top-0 justify-between h-20 max-h-20 min-h-20 items-center border-b-2 border-white">
        <div className="text-2xl">Question</div>
        {/* Timer */}
        <div className="text-2xl">
          Timer : <span>{timer}</span>
        </div>
      </section>
      <section className="flex w-full mt-24   h-full flex-col gap-2 lg:flex-row">
        <section className=" h-[40%] lg:h-full  flex w-full lg:w-1/2">
          {/* Question will display here */}
          {question && (
            <QuestionsContainer
              question={JSON.parse(question)}
              output={output}
            />
          )}
        </section>
        <section className="h-full flex  w-full lg:w-1/2">
          {/* User Write there code here */}
          <EditorContainer getCode={getCode} />
        </section>
      </section>
      <section className="w-full">
        {/* Console controller */}
        <ConsoleContainer
          handleCompile={handleCompile}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </section>
    </main>
  );
};

export async function getServerSideProps(ctx: any) {
  const { req, res } = ctx;
  const channelToken = getCookie("channelToken", { req, res });
  const channelID = getCookie("channelID", { req, res });
  const question = getCookie("question", { req, res });
  return {
    props: {
      channelToken: channelToken ? channelToken : "",
      channelID: channelID ? channelID : "",
      question: question ? question : "",
    }, // will be passed to the page component as props
  };
}

export default Match;
