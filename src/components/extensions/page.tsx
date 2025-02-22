import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet, EditorView } from "prosemirror-view";
import { Node } from "prosemirror-model";

type PageSizes = {
  height: number;
  width: number;
  margin: number;
};

type Format = "A4" | "A5";

const supportedFormats: Record<Format, PageSizes> = {
  A4: {
    height: 297,
    width: 210,
    margin: 20,
  },
  A5: {
    height: 148,
    width: 105,
    margin: 5,
  },
} as const;

export interface PaginationOptions {
  format: Format;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    pagination: {
      setPaginationOptions: (options: Partial<PaginationOptions>) => ReturnType;
    };
  }
}

export const Pagination = Extension.create<PaginationOptions>({
  name: "pagination",

  addOptions() {
    return {
      format: "A4",
    };
  },

  addCommands() {
    return {
      setPaginationOptions:
        (options: Partial<PaginationOptions>) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta("paginationOptions", options);
          }
          return true;
        },
    };
  },

  onCreate() {
    const editorContainer = getEditorContainer(this.editor.view);
    setFormat(this.options.format, editorContainer as HTMLElement);
  },

  // onUpdate() {
  //   const editorContainer = getEditorContainer(this.editor.view);
  //   setFormat(this.options.format, editorContainer as HTMLElement);
  // },

  addProseMirrorPlugins() {
    const pluginKey = new PluginKey("pagination");

    return [
      new Plugin({
        key: pluginKey,
        state: {
          init: () => ({ ...this.options }),
          apply: (tr, value) => {
            const newOptions = tr.getMeta("paginationOptions");
            return newOptions ? { ...value, ...newOptions } : value;
          },
        },
        props: {
          decorations: (state) => {
            const { doc } = state;
            const decorations: Decoration[] = [];

            let currentPageHeight = 0;
            let pageNumber = 1;
            const options = pluginKey.getState(state);
            const { format } = options as PaginationOptions;
            const { height, margin } = formattingInPx(format);
            const effectivePageHeight = height - 2 * margin;

            const createPageBreak = (pos: number, offset: number) => {
              return Decoration.widget(pos, () => {
                const pageBreak = createPageBreakElement(
                  pageNumber,
                  margin,
                  offset
                );
                pageNumber++;
                return pageBreak;
              });
            };

            const createTableBreak = (pos: number) => {
              return Decoration.widget(pos, () => {
                const pageBreak = createTableBreakElement(margin);
                pageNumber++;
                return pageBreak;
              });
            };

            doc.descendants((node: Node, pos: number, parent: Node|null) => {
              if (!node.isBlock) return;
              if( parent?.type.name !== 'doc' && node.type.name !== 'tableRow' ) return;
              const nodeDOM = this.editor.view.nodeDOM(pos);
              if (!(nodeDOM instanceof HTMLElement)) return;

              const nodeHeight = nodeDOM.clientHeight;

              if (nodeHeight === 0) return;

              if (currentPageHeight + nodeHeight > effectivePageHeight) {
                if (node.type.name === 'tableRow') {
                  console.log('tableRow', pos, effectivePageHeight - currentPageHeight);
                  decorations.push(createTableBreak(pos));
                  currentPageHeight = nodeHeight;
                } else {
                  decorations.push(
                    createPageBreak(pos, effectivePageHeight - currentPageHeight)
                  );
                  currentPageHeight = nodeHeight;
                }
              } else {
                currentPageHeight += nodeHeight;
              }
            });

            decorations.push(
              Decoration.widget(this.editor.state.doc.content.size, () => {
                const filler = createLastPageHeightFiller(
                  format,
                  currentPageHeight
                );
                return filler;
              })
            );

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          class: {
            default: null,
            parseHTML: (element: HTMLElement) => element.getAttribute("class"),
            renderHTML: (attributes) =>
              attributes.class ? { class: attributes.class } : {},
          },
        },
      },
    ];
  },
});

function createTableBreakElement(
  margin: number,
) {
  console.log('createTableBreakElement', margin);
  const tableBreak = document.createElement("tr");
  tableBreak.className = "table-break";
  tableBreak.style.cssText = `
    height: ${2 * margin }px;
    width: 100%;
    margin: 0;
    background: purple;
  `;
  return tableBreak;
}

function createPageBreakElement(
  pageNumber: number,
  margin: number,
  offset: number
) {
  const pageBreak = document.createElement("div");
  pageBreak.className = "page-break";
  pageBreak.style.cssText = `
    height: ${2 * margin + offset}px;
    width: calc(100% + ${2 * margin}px);
    margin: 0 -${margin}px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  pageBreak.setAttribute("data-page-number", String(pageNumber));

  const pageSeparator = document.createElement("div");
  pageSeparator.className = "page-separator";
  pageSeparator.style.cssText = `
    height: 1px;
    width: 100%;
    background: #ccc;
    margin: 0;
    @media print {
      display: none;
    }
  `;

  pageBreak.appendChild(pageSeparator);

  return pageBreak;
}

function setFormat(format: Format, container: HTMLElement) {
  const { width, margin } = formattingInPx(format);
  container.style.width = `${width - 2 * margin}px`;
  container.style.margin = `${margin}px`;
}

function createLastPageHeightFiller(format: Format, currentHeight: number) {
  const { height, margin } = formattingInPx(format);
  const effectivePageHeight = height - 2 * margin;
  const lastPageHeight = effectivePageHeight - currentHeight;

  const filler = document.createElement("div");
  filler.style.height = `${lastPageHeight}px`;
  filler.style.backgroundColor = "red";
  return filler;
}

function getEditorContainer(view: EditorView) {
  return view.dom.closest(".ProseMirror") as HTMLElement;
}

function getMMtoPxRatio() {
  const div = document.createElement("div");
  div.style.height = `1mm`;
  document.body.appendChild(div);
  const px = div.offsetHeight;
  document.body.removeChild(div);
  return px;
}

function formattingInPx(format: Format) {
  const { height, width, margin } = supportedFormats[format];
  const px = getMMtoPxRatio();
  const values = {
    height: height * px,
    width: width * px,
    margin: margin * px,
  };
  return values;
}
