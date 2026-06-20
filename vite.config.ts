import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

const globals: Record<string, string> = {
  react: "React",
  "react-dom": "ReactDOM",
  "react/jsx-runtime": "ReactJsxRuntime",
  "react/jsx-dev-runtime": "ReactJsxDevRuntime",
  "@mui/material": "MaterialUI",
  "@mui/material/styles": "materialStyles",
  "@mui/icons-material": "MUIIcons",
  "@emotion/react": "emotionReact",
  "@emotion/styled": "emotionStyled",
};

const subpathGlobal = (id: string): string | undefined => {
  if (id.startsWith("@mui/material/")) {
    const name = id.split("/").pop()!;
    return name;
  }
  if (id.startsWith("@mui/icons-material/")) {
    const name = id.split("/").pop()!;
    return name.endsWith("Icon") ? name : `${name}Icon`;
  }
  return undefined;
};

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
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/lib.ts"),
      name: "Prati",
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
          entryFileNames: "prati.es.js",
          globals(id: string) {
            return globals[id] ?? subpathGlobal(id);
          },
        },
        {
          format: "umd",
          name: "Prati",
          entryFileNames: "prati.umd.js",
          interop: "default",
          globals(id: string) {
            return globals[id] ?? subpathGlobal(id);
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
