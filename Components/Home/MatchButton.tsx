import { setCookie } from "cookies-next";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import img from "../../public/Asserts/HomePage.jpg";

const url = process.env.NEXT_PUBLIC_URL;

const MatchButton = ({ setChannelID, setLoading, setChannelToken, setQuestion }: any) => {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Username");

  //Handling the The Start Button Press
  const handleMatch = async () => {
    if (username === null || username === undefined || username === "") {
      setError(true);
      setHelperText("Please Enter a Username");
      return;
    }
    setLoading(true);
    const res = await axios.post(`${url}/matchmaking/start`, {
      player: username,
    });
    setChannelToken(res.data.channelToken);
    setChannelID(res.data.channelID);
    setQuestion(res.data.question);
    setCookie("username", username);
  };
  return (
    <>
      <section className="flex justify-center items-center w-full h-full ">
        <div className="flex flex-col items-center xl:flex-row  w-full justify-center gap-20">
          <div className="h-[15rem]  overflow-hidden w-[15rem] 2xl:w-[30rem] 2xl:h-[30rem] xl:h-[25rem] xl:w-[25rem] lg:h-[20rem] lg:w-[20rem]   rounded-full relative">
            <Image src={img} placeholder="blur" layout="fill" />
          </div>
          <div className="flex flex-col  justify-center items-center gap-6 w-[40rem]">
            <h1 className="text-4xl font-bold text-white">
              Enter Your UserName
            </h1>
            <section className="w-[80%] gap-5 flex flex-col justify-center items-center">
              <div className="w-full flex justify-center rounded-[10px] items-center h-fit">
                <TextField
                  error={error}
                  id="outlined-basic"
                  label={helperText}
                  variant="outlined"
                  onChange={(e: any) => {
                    setUsername(e.target.value);
                    setError(false);
                    setHelperText("Username");
                  }}
                  sx={{
                    borderColor: "white",
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                      "&.Mui-focused": {
                        color: "white",
                      },
                    },
                  }}
                />
              </div>
              <div className="w-full flex justify-center rounded-[10px] items-center h-fit bg-blue-700">
                <Button
                  variant="contained"
                  onClick={() => handleMatch()}
                  sx={{
                    backgroundColor: "blue",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "blue",
                    },
                  }}
                >
                  Start
                </Button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default MatchButton;
