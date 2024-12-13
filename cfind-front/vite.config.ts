import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }: {mode: string}) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
      plugins: [react()],
      define: {
        __APP_ENV__: JSON.stringify(env.APP_ENV),
      },
      build: {
        minify: false
      },
      server: {
          proxy: {
              '/api': {
                  // target: `${env.BACKEND_URL}`,
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/api/, '')
              },
          },
      },
  });
};