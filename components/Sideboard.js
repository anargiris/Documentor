"use client";
import React, { useState } from "react";

const Sideboard = () => {
  const [sections, setSections] = useState([]);
  const [editSection, setEditSection] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const handleSectionTitleChange = (index, newTitle) => {
    const newSections = [...sections];
    newSections[index].title = newTitle;
    setSections(newSections);
  };

  const handleChildTitleChange = (parentIndex, childIndex, newTitle) => {
    const newSections = [...sections];
    newSections[parentIndex].children[childIndex].title = newTitle;
    setSections(newSections);
  };

  const addParentSection = () => {
    const newSection = { title: "New Section", children: [] };
    setSections([...sections, newSection]);
    setExpandedSections({
      ...expandedSections,
      [sections.length]: true, // Set the new section to be expanded
    });
  };

  const addChildSection = (parentIndex) => {
    const newSections = [...sections];
    newSections[parentIndex].children.push({ title: "New Child Section" });
    setSections(newSections);
  };

  const toggleSection = (index) => {
    setExpandedSections({
      ...expandedSections,
      [index]: !expandedSections[index],
    });
  };

  const removeParentSection = (index) => {
    const newSections = sections.filter((_, idx) => idx !== index);
    setSections(newSections);
  };

  const removeChildSection = (parentIndex, childIndex) => {
    const newSections = [...sections];
    newSections[parentIndex].children = newSections[
      parentIndex
    ].children.filter((_, idx) => idx !== childIndex);
    setSections(newSections);
  };

  return (
    <div className="w-1/4 border-r border-gray-800 p-4 overflow-y-auto">
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          {" "}
          <div className="flex justify-between items-center">
            {editSection === `parent-${index}` ? (
              <input
                type="text"
                className="border-none outline-none rounded"
                value={section.title}
                onChange={(e) =>
                  handleSectionTitleChange(index, e.target.value)
                }
                onBlur={() => setEditSection(null)}
                autoFocus
              />
            ) : (
              <div
                onClick={() => setEditSection(`parent-${index}`)}
                className="cursor-pointer font-semibold"
              >
                {section.title}
              </div>
            )}{" "}
            <button
              onClick={() => toggleSection(index)}
              className="ml-2 py-1 px-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              {expandedSections[index] ? "Hide" : "Show"}
            </button>{" "}
            <button
              onClick={() => removeParentSection(index)}
              className="ml-2 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
          {expandedSections[index] && (
            <div className="ml-4">
              {section.children.map((child, childIndex) => (
                <div key={childIndex} className="mt-2">
                  {editSection === `child-${index}-${childIndex}` ? (
                    <input
                      type="text"
                      className="border-none outline-none rounded"
                      value={child.title}
                      onChange={(e) =>
                        handleChildTitleChange(
                          index,
                          childIndex,
                          e.target.value
                        )
                      }
                      onBlur={() => setEditSection(null)}
                      autoFocus
                    />
                  ) : (
                    <div
                      onClick={() =>
                        setEditSection(`child-${index}-${childIndex}`)
                      }
                      className="cursor-pointer"
                    >
                      {child.title}
                    </div>
                  )}{" "}
                  <button
                    onClick={() => removeChildSection(index, childIndex)}
                    className="ml-2 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addChildSection(index)}
                className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Child Section
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addParentSection}
        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Section
      </button>
    </div>
  );
};

export default Sideboard;
