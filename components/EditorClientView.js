"use client";
import React, { useEffect, useState } from "react";
import Editor from "@/components/Editor";
import RenderedContent from "@/components/RenderedContent";
import Sideboard from "@/components/Sideboard";

const EditorClientView = ({ documentsData }) => {
  const [view, setView] = useState("editor");
  const [content, setContent] = useState(documentsData.content); // Content state
  const [activeSection, setActiveSection] = useState("child-0-0"); // Active section identifier
  // const [sections, setSections] = useState([
  //   { title: "New Section", children: [{ title: "Child section" }] },
  // ]);

  const [sections, setSections] = useState(documentsData.sections);
  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const updateContent = (newContent) => {
    setContent({ ...content, [activeSection]: newContent });
  };

  const saveDocument = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
    console.log("user is", user);
    // Here, you would typically serialize `documentData` and send it to your database
    console.log(documentData);
    // Example: Save to Supabase (pseudo-code)
    // supabaseClient.from('documents').insert([documentData]);

    const { data, error } = await supabase
      .from("documents")
      .update({
        title: "My 1st documentation",
        user_id: user.id,
        content: JSON.stringify(documentData),
      })
      .eq("id", "2")
      .select();

    console.log("returned values from update", data, error);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-12 border-b border-gray-400 flex items-center px-5">
        <div>
          {view === "editor" ? (
            <button onClick={() => setView("client")}>Editor View</button>
          ) : (
            <button onClick={() => setView("editor")}>Client View</button>
          )}
        </div>
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
        {activeSection && (
          <div className="py-2 px-4 w-3/4">
            {view === "editor" ? (
              <Editor
                content={content[activeSection]}
                updateContent={updateContent}
              />
            ) : (
              <RenderedContent content={content[activeSection]} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorClientView;
