import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    host_permissions: ["*://*.linkedin.com/*"],
    permissions: ["tabs"],
  },
});
