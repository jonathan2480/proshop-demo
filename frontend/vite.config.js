import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default ({mode}) => {
  const env = loadEnv(mode, process.cwd())

  const config = {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: `${env.VITE_BACKEND_API}`,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
  return defineConfig(config)
}




// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8000/api',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\api/, '')
//       }
//     }
//   }
// })
