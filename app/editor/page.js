"use client";
import Editor from "@/components/Editor";
import Sideboard from "@/components/Sideboard";
import React, { useState } from "react";

const page = () => {
  const [content, setContent] = useState({}); // Content state
  const [activeSection, setActiveSection] = useState(null); // Active section identifier

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const updateContent = (newContent) => {
    setContent({ ...content, [activeSection]: newContent });
  };

  console.log("content is", content);
  return (
    <div className="flex flex-col h-screen">
      <div className="h-12 border-b border-gray-800"></div>
      <div className="flex flex-1 overflow-y-auto">
        <Sideboard handleSectionClick={handleSectionClick} />
        <div className="py-10 px-4 w-3/4">
          {activeSection} {content[activeSection]}
          <Editor
            content={content[activeSection]}
            updateContent={updateContent}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
