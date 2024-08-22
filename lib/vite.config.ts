import react from "@vitejs/plugin-react";
// import dts from "vite-plugin-dts";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import typescript from "@rollup/plugin-typescript";
import tailwindcss from "tailwindcss";
import { defineConfig, UserConfigExport } from "vite";
import { name } from "./package.json";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "node:path";

console.log(path.join(__dirname, "src/lib/index.ts"));

// based on https://github.com/scheduleonce/once-ui-react/blob/main/vite.config.ts
const app = async (): Promise<UserConfigExport> => {
  /**
   * Removes everything before the last
   * @octocat/library-repo -> library-repo
   * vite-component-library-template -> vite-component-library-template
   */
  const formattedName = name.match(/[^/]+$/)?.[0] ?? name;

  return defineConfig({
    plugins: [
      react(),
      // dts({
      //   insertTypesEntry: true,
      //   copyDtsFiles: true,
      //   // include: 'src/lib/**/*',
      //   staticImport: true,
      // }),
      cssInjectedByJsPlugin(),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    server: {
      port: 3123,
    },
    build: {
      manifest: true,
      minify: true,
      reportCompressedSize: true,
      lib: {
        entry: [path.resolve(__dirname, "src/lib/index.ts")],
        name: formattedName,
        // formats: ["es", "umd"],
        formats: ["es"],
        fileName: (format: string) => `${formattedName}.${format}.js`,
      },
      rollupOptions: {
        plugins: [
          typescriptPaths({
            preserveExtensions: true,
          }),
          typescript({
            sourceMap: true,
            declaration: true,
            composite: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            isolatedDeclarations: true,
            emitDeclarationOnly: true,
            outDir: "dist",
            exclude: ["**/**.test.**", "**/**.mock.**"],
          }),
        ],
        external: [],
        output: {
          globals: {
            react: "React",
            "react/jsx-runtime": "react/jsx-runtime",
            "react-dom": "ReactDOM",
            tailwindcss: "tailwindcss",
          },
        },
      },
      target: "esnext",
      sourcemap: true,
      copyPublicDir: true,
    },
  });
};
// https://vitejs.dev/config/
export default app;
