import React, { useRef, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Bold from "@tiptap/extension-bold";

const RenderedContent = ({ content }) => {
  const editor = useEditor(
    {
      editable: false,
      content,
      extensions: [StarterKit, Underline, Highlight, TextAlign, Bold],
    },
    [content]
  );

  return (
    <RichTextEditor
      style={{ border: "0px solid white" }}
      className="h-full overflow-y-auto"
      editor={editor}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default RenderedContent;
