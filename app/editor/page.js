import Editor from "@/components/Editor";
import Sideboard from "@/components/Sideboard";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-12 border-b border-gray-800"></div>
      <div className="flex flex-1 overflow-y-auto">
        <Sideboard />
        <div className="py-10 px-4 w-3/4">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default page;
