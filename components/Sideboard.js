"use client";
import React, { useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
const Sideboard = ({ handleSectionClick, sections, setSections }) => {
  const [parent] = useAutoAnimate();

  const [editSection, setEditSection] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    0: true,
  });

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
    <div
      ref={parent}
      className="w-1/4 border-r border-gray-300 px-2 py-4 overflow-y-auto"
    >
      {sections.map((section, index) => (
        <div ref={parent} key={index} className="mb-4">
          <div className="flex justify-between items-center group">
            <div className="flex-1 w-2/3 overflow-hidden flex items-center gap-1 break-all">
              <button onClick={() => toggleSection(index)} className="">
                {!expandedSections[index] ? (
                  <Image
                    alt="Show section icon"
                    src="/icons/caret-forward-outline.svg"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    alt="Hide section icon"
                    src="/icons/caret-down-outline.svg"
                    width={20}
                    height={20}
                  />
                )}
              </button>
              {editSection === `parent-${index}` ? (
                <input
                  type="text"
                  className="border-none outline-none rounded break-all"
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
                  className="cursor-pointer font-semibold break-words "
                >
                  {section.title}
                </div>
              )}
            </div>
            <div className="items-center gap-1 flex">
              <button onClick={() => removeParentSection(index)}>
                <Image
                  alt="Remove section icon"
                  src="/icons/remove-circle-outline.svg"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          {expandedSections[index] && (
            <div ref={parent} className="ml-7">
              {section.children.map((child, childIndex) => (
                <div
                  key={childIndex}
                  className="mt-2 flex justify-between items-center"
                >
                  <div className="flex-1 overflow-hidden text-sm">
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
                        onClick={() => {
                          setEditSection(`child-${index}-${childIndex}`);
                          handleSectionClick(`child-${index}-${childIndex}`);
                        }}
                        className="cursor-pointer font-medium"
                      >
                        {child.title}
                      </div>
                    )}
                  </div>
                  <button onClick={() => removeChildSection(index, childIndex)}>
                    <Image
                      alt="Remove child section icon"
                      src="/icons/remove-circle-outline.svg"
                      width={17}
                      height={17}
                    />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addChildSection(index)}
                className="mt-2 py-1 flex items-center gap-2 text-xs text-neutral-700 border-b w-full hover:bg-neutral-100 transition duration-200"
              >
                <Image
                  alt="Add child section icon"
                  src="/icons/add-outline.svg"
                  width={15}
                  height={15}
                />
                Add Child Section
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addParentSection}
        className="flex items-center gap-2 border-b w-full hover:bg-neutral-100 transition duration-200 py-1"
      >
        <Image
          alt="Add section icon"
          src="/icons/add-outline.svg"
          width={20}
          height={20}
        />
        Add Section
      </button>
    </div>
  );
};

export default Sideboard;
