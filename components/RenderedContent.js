import React, { useRef, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

const RenderedContent = ({ content }) => {
  const editor = useEditor(
    {
      editable: false,
      content,
      extensions: [
        StarterKit,
        Underline,
        Link,
        Superscript,
        SubScript,
        Highlight,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
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
