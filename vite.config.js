import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  server: {
    host: '0.0.0.0', // Écoute sur toutes les interfaces réseau
    port: 5173,
    fs: {
      allow: ['/app']
    }
  },
  preview: {
    host: '0.0.0.0', // Écoute sur toutes les interfaces réseau
    port: 5173,
    fs: {
      allow: ['/app']
    }
  }
});

// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [react()],
//   envPrefix: 'VITE_',
// });