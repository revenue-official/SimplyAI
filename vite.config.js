import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    define: {
      APP_NAME: JSON.stringify(env.APP_NAME),
      APP_URL: JSON.stringify(env.APP_URL),
      APP_ENV: JSON.stringify(env.APP_ENV),
      VITE_APP_GROOQ_API_TOKEN: JSON.stringify(env.VITE_APP_GROOQ_API_TOKEN),
      VITE_APP_HF_API_TOKEN: JSON.stringify(env.VITE_APP_HF_API_TOKEN),
      VITE_APP_GEMINI_API_TOKEN: JSON.stringify(env.VITE_APP_GEMINI_API_TOKEN),
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  };
});
