"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Pagination } from "./extensions/page";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const content = `
  <h1>Hello World!</h1>
  <p>This is a test of the pagination extension.</p>
  <p>It should break the page after the second paragraph.</p>
  <p>This is the third paragraph.</p>
  <p>This is the fourth paragraph.</p>
  <p>This is the fifth paragraph.</p>
  <p>This is the sixth paragraph.</p>
  <p>This is the seventh paragraph.</p>
  <p>This is the eighth paragraph.</p>
  <p>This is the ninth paragraph.</p>
  <p>This is the tenth paragraph.</p>
  <p>This is the eleventh paragraph.</p>
  <p>This is the twelfth paragraph.</p>

  <h1>Hello World!</h1>
  <p>This is a test of the pagination extension.</p>
  <p>It should break the page after the second paragraph.</p>
  <p>This is the third paragraph.</p>
  <p>This is the fourth paragraph.</p>
  <p>This is the fifth paragraph.</p>
`;

const Tiptap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef: ref });
  const editor = useEditor({
    extensions: [
      StarterKit,
      // HandleExtension,
      Pagination.configure({
        format: "A4",
      }),
    ],
    content: content,
    immediatelyRender: false,
  });

  return (
    <div className="gap-4 h-screen">
      <button className="fixed top-10 left-10" onClick={() => reactToPrintFn()}>
        print
      </button>
      <div className="bg-stone-100">
        <EditorContent
          ref={ref}
          editor={editor}
          className="overflow-y-auto m-auto w-fit ring-1 ring-stone-200 page bg-white prose prose-sm !max-w-none"
        />
      </div>
    </div>
  );
};

export default Tiptap;
