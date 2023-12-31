"use client";
import Editor from "@/components/Editor";
import Sideboard from "@/components/Sideboard";
import React, { useState } from "react";

const page = () => {
  const [content, setContent] = useState({}); // Content state
  const [activeSection, setActiveSection] = useState(null); // Active section identifier
  const [sections, setSections] = useState([
    { title: "New Section", children: [] },
  ]);

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const updateContent = (newContent) => {
    setContent({ ...content, [activeSection]: newContent });
  };

  const saveDocument = async () => {
    console.log(sections, content);
    const documentData = sections.map((section, sectionIndex) => {
      const sectionContentId = `section-${sectionIndex}`;
      return {
        id: section.id || sectionContentId, // Assuming each section also has an 'id' field
        title: section.title,
        content: content[sectionContentId] || "", // Fallback to empty string if no content
        children: section.children.map((child, childIndex) => {
          const childContentId = `child-${sectionIndex}-${childIndex}`;
          return {
            id: child.id || childContentId, // Assuming each child also has an 'id' field
            title: child.title,
            content: content[childContentId] || "", // Fallback to empty string if no content
          };
        }),
      };
    });

    // Here, you would typically serialize `documentData` and send it to your database
    console.log(documentData);
    // Example: Save to Supabase (pseudo-code)
    // supabaseClient.from('documents').insert([documentData]);
  };

  console.log(content, sections);
  return (
    <div className="flex flex-col h-screen">
      <div className="h-12 border-b border-gray-400 flex items-center px-5">
        <button onClick={saveDocument} className="ml-auto">
          Save
        </button>
      </div>
      <div className="flex flex-1 overflow-y-auto">
        <Sideboard
          handleSectionClick={handleSectionClick}
          sections={sections}
          setSections={setSections}
        />
        <div className="py-10 px-4 w-3/4">
          {/* {activeSection} {content[activeSection]} */}
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
