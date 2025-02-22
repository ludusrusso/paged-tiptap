import { Extension } from "@tiptap/core";
import { Node } from "prosemirror-model";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { createRoot } from "react-dom/client";

export interface HandleOptions {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    handle: {
      setHandleOptions: (options: Partial<HandleOptions>) => ReturnType;
    };
  }
}

type PluginState = {
  dragElem: HTMLElement | null;
  pos: number;
};

export const HandleExtension = Extension.create<HandleOptions, number>({
  name: "handle",

  addOptions() {
    return {};
  },

  addCommands() {
    return {
      setHandleOptions:
        (options: Partial<HandleOptions>) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta("handleOptions", options);
          }
          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    const pluginKey = new PluginKey<PluginState>("handle");

    return [
      new Plugin<PluginState>({
        key: pluginKey,
        state: {
          init: () => {
            const el = instantiateElement();
            return {
              dragElem: el,
              pos: 0,
            };
          },
          apply: (tr, value) => {
            const newOptions = tr.getMeta("handleOptions");
            return newOptions ? { ...value, ...newOptions } : value;
          },
        },

        props: {
          handleDOMEvents: {
            mouseover: (view, event) => {
              const target = event.target;
              if (!target || !(target instanceof Element)) {
                return;
              }

              const mainTarget = target.closest(".paraf-over");
              console.log("mainTarget", mainTarget);
              if (!mainTarget) {
                return;
              }

              const pos = view.posAtDOM(mainTarget, 0);
              console.log("pos", pos);
              const el = pluginKey.getState(view.state)?.dragElem;
              if (!el) {
                return;
              }

              const pp = calculateButtonPosition(target);
              console.log(pp);

              el.style.top = `${pp.top}px`;

              console.log("mouseenter", el);
            },
            mouseleave: (view) => {
              const el = pluginKey.getState(view.state)?.dragElem;
              if (!el) {
                return;
              }
              el.style.top = "-100px";
            },
          },

          decorations: (state) => {
            const { doc } = state;
            const decorations: Decoration[] = [];

            doc.descendants((node: Node, pos: number) => {
              if (node.type.name === "paragraph") {
                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    nodeName: "div",
                    class:
                      "paraf-over hover:bg-red-200 p-2 px-10 max-w-md m-auto border border-dashed border-red-500",
                  })
                );
              }
            });

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

function instantiateElement() {
  const reactContainer = document.createElement("div");
  reactContainer.className = "drag-handle absolute z-1000";
  document.body.appendChild(reactContainer);

  const root = createRoot(reactContainer);
  root.render(<div>Handle</div>);

  reactContainer.style.top = "10px";
  reactContainer.style.left = "10px";

  return reactContainer;
}

function calculateButtonPosition(node: Element) {
  const compStyle = window.getComputedStyle(node);

  const parsedLineHeight = parseInt(compStyle.lineHeight, 10);
  const lineHeight = isNaN(parsedLineHeight)
    ? parseInt(compStyle.fontSize) * 1.2
    : parsedLineHeight;

  const paddingTop = parseInt(compStyle.paddingTop, 10);

  const rect = absoluteRect(node);

  rect.top += (lineHeight - 24) / 2;
  rect.top += paddingTop;

  rect.width = 24;

  return rect;
}

function absoluteRect(node: Element) {
  const data = node.getBoundingClientRect();
  const modal = node.closest('[role="dialog"]');

  if (modal && window.getComputedStyle(modal).transform !== "none") {
    const modalRect = modal.getBoundingClientRect();

    return {
      top: data.top - modalRect.top,
      left: data.left - modalRect.left,
      width: data.width,
      height: data.height,
    };
  }
  return {
    top: data.top,
    left: data.left,
    width: data.width,
    height: data.height,
  };
}
