import React, { useState } from "react";
import dynamic from "next/dynamic";


const Editor = dynamic(
  async () => {
    const ace = await import("react-ace");
    require("ace-builds/src-noconflict/mode-javascript");
    require("ace-builds/src-noconflict/theme-twilight");
    require("ace-builds/src-noconflict/ext-language_tools");
    return ace;
  },
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

const EditorContainer = ({ getCode }: any) => {
  const [code, setCode] = useState("");

  getCode(code);

  return (
    <section className="flex flex-col h-full w-full relative">
      <div className="h-full w-full">
        {/** Ace Editor */}
        <Editor
          style={{ width: "100%", height: "100%" }}
          placeholder="Welcome To Code Battle"
          mode="javascript"
          theme="twilight"
          name="Code Editor"
          readOnly={false}
          onChange={(val: any) => setCode(val)}
          fontSize={25}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={code}
          setOptions={{
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 5,
          }}
        />
      </div>
    </section>
  );
};

export default EditorContainer;
