import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'

dotenv.config()

export default defineConfig({
    base: '/',
    plugins: [react()],
    define: {
        'import.meta.env.VITE_CMS_TOKEN': JSON.stringify(process.env.VITE_CMS_TOKEN),
        'import.meta.env.VITE_CMS_URL': JSON.stringify(process.env.VITE_CMS_URL),
    },
    build: {
        rollupOptions: {
            input: {
                app: './index.html',
            },
        },
    },
    preview: {
        port: 8080,
        strictPort: true
    },
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: 'http://localhost:8080'
    },
})
