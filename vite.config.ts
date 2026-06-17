import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      insertTypesEntry: true,
      exclude: [
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "**/*.stories.ts",
        "**/*.stories.tsx",
      ],
      compilerOptions: {
        skipLibCheck: true,
      },
    }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib.ts"),
      name: "Prati",
      formats: ["es", "umd"],
      fileName: (format) => `prati.${format}.js`,
    },
    rollupOptions: {
      external: (id) => {
        return (
          id === "react" ||
          id === "react-dom" ||
          id === "react/jsx-runtime" ||
          id === "react/jsx-dev-runtime" ||
          id.startsWith("@mui/") ||
          id.startsWith("@emotion/")
        );
      },
      output: [
        {
          format: "es",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "ReactJsxRuntime",
            "react/jsx-dev-runtime": "ReactJsxDevRuntime",
            "@mui/material": "MaterialUI",
            "@mui/material/styles": "materialStyles",
            "@mui/icons-material": "MUIIcons",
            "@emotion/react": "emotionReact",
            "@emotion/styled": "emotionStyled",
          },
        },
        {
          format: "umd",
          name: "Prati",
          interop: "default",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "ReactJsxRuntime",
            "react/jsx-dev-runtime": "ReactJsxDevRuntime",
            "@mui/material": "MaterialUI",
            "@mui/material/styles": "materialStyles",
            "@mui/icons-material": "MUIIcons",
            "@emotion/react": "emotionReact",
            "@emotion/styled": "emotionStyled",
          },
        },
      ],
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "istanbul",
    },
  },
});
