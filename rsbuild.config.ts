import { pluginBasicSsl } from "@rsbuild/plugin-basic-ssl";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact(), pluginBasicSsl()],
  output: {
    assetPrefix: "/challenge/",
  },
  server: {
    port: 3000,
  },
  source: {
    alias: {
      "@": "./src",
    },
    define: {
      "process.env": {},
    },
  },
  tools: {
    bundlerChain: (chain) => {
      chain.output.uniqueName("challenge");
    },
    htmlPlugin: {
      title: "Tractian Challenge",
    },
  },
});