"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Pagination } from "./extensions/page";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

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

  <table>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Stock</th>
      <th>Category</th>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Wireless Mouse</td>
      <td>$29.99</td>
      <td>122</td>
      <td>Accessories</td>
    </tr>
    <tr>
      <td>Coffee Maker</td>
      <td>$89.99</td>
      <td>67</td>
      <td>Appliances</td>
    </tr>
    <tr>
      <td>Desk Chair</td>
      <td>$199.99</td>
      <td>23</td>
      <td>Furniture</td>
    </tr>
    <tr>
      <td>Headphones</td>
      <td>$149.99</td>
      <td>89</td>
      <td>Electronics</td>
    </tr>    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Wireless Mouse</td>
      <td>$29.99</td>
      <td>122</td>
      <td>Accessories</td>
    </tr>
    <tr>
      <td>Coffee Maker</td>
      <td>$89.99</td>
      <td>67</td>
      <td>Appliances</td>
    </tr>
    <tr>
      <td>Desk Chair</td>
      <td>$199.99</td>
      <td>23</td>
      <td>Furniture</td>
    </tr>
    <tr>
      <td>Headphones</td>
      <td>$149.99</td>
      <td>89</td>
      <td>Electronics</td>
    </tr>    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Wireless Mouse</td>
      <td>$29.99</td>
      <td>122</td>
      <td>Accessories</td>
    </tr>
    <tr>
      <td>Coffee Maker</td>
      <td>$89.99</td>
      <td>67</td>
      <td>Appliances</td>
    </tr>
    <tr>
      <td>Desk Chair</td>
      <td>$199.99</td>
      <td>23</td>
      <td>Furniture</td>
    </tr>
    <tr>
      <td>Headphones</td>
      <td>$149.99</td>
      <td>89</td>
      <td>Electronics</td>
    </tr>    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Wireless Mouse</td>
      <td>$29.99</td>
      <td>122</td>
      <td>Accessories</td>
    </tr>
    <tr>
      <td>Coffee Maker</td>
      <td>$89.99</td>
      <td>67</td>
      <td>Appliances</td>
    </tr>
    <tr>
      <td>Desk Chair</td>
      <td>$199.99</td>
      <td>23</td>
      <td>Furniture</td>
    </tr>
    <tr>
      <td>Headphones</td>
      <td>$149.99</td>
      <td>89</td>
      <td>Electronics</td>
    </tr>    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Wireless Mouse</td>
      <td>$29.99</td>
      <td>122</td>
      <td>Accessories</td>
    </tr>
    <tr>
      <td>Coffee Maker</td>
      <td>$89.99</td>
      <td>67</td>
      <td>Appliances</td>
    </tr>
    <tr>
      <td>Desk Chair</td>
      <td>$199.99</td>
      <td>23</td>
      <td>Furniture</td>
    </tr>
    <tr>
      <td>Headphones</td>
      <td>$149.99</td>
      <td>89</td>
      <td>Electronics</td>
    </tr>    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Wireless Mouse</td>
      <td>$29.99</td>
      <td>122</td>
      <td>Accessories</td>
    </tr>
    <tr>
      <td>Coffee Maker</td>
      <td>$89.99</td>
      <td>67</td>
      <td>Appliances</td>
    </tr>
    <tr>
      <td>Desk Chair</td>
      <td>$199.99</td>
      <td>23</td>
      <td>Furniture</td>
    </tr>
    <tr>
      <td>Headphones</td>
      <td>$149.99</td>
      <td>89</td>
      <td>Electronics</td>
    </tr>    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Wireless Mouse</td>
      <td>$29.99</td>
      <td>122</td>
      <td>Accessories</td>
    </tr>
    <tr>
      <td>Coffee Maker</td>
      <td>$89.99</td>
      <td>67</td>
      <td>Appliances</td>
    </tr>
    <tr>
      <td>Desk Chair</td>
      <td>$199.99</td>
      <td>23</td>
      <td>Furniture</td>
    </tr>
    <tr>
      <td>Headphones</td>
      <td>$149.99</td>
      <td>89</td>
      <td>Electronics</td>
    </tr>    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Wireless Mouse</td>
      <td>$29.99</td>
      <td>122</td>
      <td>Accessories</td>
    </tr>
    <tr>
      <td>Coffee Maker</td>
      <td>$89.99</td>
      <td>67</td>
      <td>Appliances</td>
    </tr>
    <tr>
      <td>Desk Chair</td>
      <td>$199.99</td>
      <td>23</td>
      <td>Furniture</td>
    </tr>
    <tr>
      <td>Headphones</td>
      <td>$149.99</td>
      <td>89</td>
      <td>Electronics</td>
    </tr>    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Wireless Mouse</td>
      <td>$29.99</td>
      <td>122</td>
      <td>Accessories</td>
    </tr>
    <tr>
      <td>Coffee Maker</td>
      <td>$89.99</td>
      <td>67</td>
      <td>Appliances</td>
    </tr>
    <tr>
      <td>Desk Chair</td>
      <td>$199.99</td>
      <td>23</td>
      <td>Furniture</td>
    </tr>
    <tr>
      <td>Headphones</td>
      <td>$149.99</td>
      <td>89</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Laptop Pro X</td>
      <td>$1,299</td>
      <td>45</td>
      <td>Electronics</td>
    </tr>
    <tr>
      <td>Wireless Mouse</td>
      <td>$29.99</td>
      <td>122</td>
      <td>Accessories</td>
    </tr>
    <tr>
      <td>Coffee Maker</td>
      <td>$89.99</td>
      <td>67</td>
      <td>Appliances</td>
    </tr>
    <tr>
      <td>Desk Chair</td>
      <td>$199.99</td>
      <td>23</td>
      <td>Furniture</td>
    </tr>
    <tr>
      <td>Headphones</td>
      <td>$149.99</td>
      <td>89</td>
      <td>Electronics</td>
    </tr>
  </table>

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
      Table,
      TableCell,
      TableHeader,
      TableRow,
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
          className="overflow-y-auto m-auto w-fit ring-1 ring-stone-200 page bg-white prose prose-sm prose-headings:m-0 prose-p:m-0 !max-w-none"
        />
      </div>
    </div>
  );
};

export default Tiptap;
