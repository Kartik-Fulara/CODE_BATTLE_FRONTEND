import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { useRouter } from "next/router";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import MatchButton from "../Components/Home/MatchButton";
import { setCookie } from "cookies-next";
import LoadingModel from "../Models/LoadingModel";

const url = process.env.NEXT_PUBLIC_URL;

const Home: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [channelToken, setChannelToken] = useState("g");
  const [channelID, setChannelID] = useState("");
  const [question, setQuestion] = useState(null);

  //Realtime Listener for MatchMade
  useEffect(
    () =>
      onSnapshot(doc(db, "match", channelToken), async (doc: any) => {
        if (doc.data()) {
          setCookie("channelToken", channelToken);
          setCookie("channelID", channelID);
          setCookie('question', (question))
          router.push("/match");
          setLoading(false);
        }
      }),
    [channelToken]
  );

  if (loading) {
    //TODO: Make a Loading Animation
    return <LoadingModel message="Creating a Session..." />;
  }

  return (
    <>
      <Head>
        <title>Coding Battle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center relative select-none  items-center flex-col h-screen w-screen   bg-black space-y-6">
        <h3 className="text-2xl text-white font-bold shadow-lg z-[1] absolute top-4 left-4">
          Coding Battle!
        </h3>
        <MatchButton
          setChannelID={setChannelID}
          setLoading={setLoading}
          setChannelToken={setChannelToken}
          setQuestion={setQuestion}
        />
      </main>
    </>
  );
};

export default Home;
