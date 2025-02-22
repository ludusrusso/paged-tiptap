"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Pagination } from "./extensions/page";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Pagination],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="grid grid-cols-2 gap-4 h-screen">
      <EditorContent editor={editor} />
      <div className="overflow-y-auto prose">
        <pre>{JSON.stringify(editor?.getJSON(), null, 2)}</pre>
      </div>
    </div>
  );
};

export default Tiptap;
