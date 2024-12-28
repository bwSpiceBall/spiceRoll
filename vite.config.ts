import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
    base: '/',
    plugins: [react()],
    define: {
        'import.meta.env.VITE_CMS_TOKEN': JSON.stringify(process.env.VITE_CMS_TOKEN),
        'import.meta.env.VITE_CMS_URL': JSON.stringify(process.env.VITE_CMS_URL),
    },
    preview: {
        port: 8080,
        strictPort: true,
        cors: {
            origin: 'http://localhost:8080',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }
    },
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: 'http://localhost:8080',
        cors: {
            origin: process.env.VITE_CMS_URL,
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }
    },
})
