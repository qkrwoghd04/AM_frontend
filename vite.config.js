import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(), // 쉼표 추가
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: [
        'favicon.ico',
        '/src/assets/aws.png',
        '/src/assets/carrot.png',
        '/src/assets/infcon.png',
        '/src/assets/toss.png',
        '/src/assets/woowa.png',
        '/src/assets/icons/icon-60.png',
        '/src/assets/icons/icon-150.png',
        '/src/assets/icons/icon-310.png'
      ],
      manifest: {
        name: 'AmazeMemo',
        short_name: 'AmazeMemo',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ],
      },
    })
  ],
})