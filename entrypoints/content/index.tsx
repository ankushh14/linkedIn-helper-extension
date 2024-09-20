import ReactDOM from "react-dom/client";
import { ContentScriptContext } from "wxt/client";
import App from "./App.tsx";
import "./globals.css";

const injectReactApp = async (ctx: ContentScriptContext) => {
  const ui = await createShadowRootUi(ctx, {
    name: "linkedin-helper-extension",
    position: "inline",
    anchor: "body",
    onMount: (container) => {
      const wrapper = document.createElement("div");
      container.append(wrapper);
      const root = ReactDOM.createRoot(wrapper);
      root.render(<App />);
      return { root, wrapper };
    },
    onRemove: (elements) => {
      elements?.root.unmount();
      elements?.wrapper.remove();
    },
  });
  return ui;
};

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await injectReactApp(ctx);
    ui.mount();
  },
});
