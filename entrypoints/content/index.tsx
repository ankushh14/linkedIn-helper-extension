import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

export default defineContentScript({
  matches: ["*://*.google.com/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "wxt-react-example",
      position: "inline",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
