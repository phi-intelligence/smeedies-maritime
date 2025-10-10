import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    // Only include Replit plugins in development
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? [
          // Replit-specific plugins removed for Amplify compatibility
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "client", "src"),
      "@shared": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "shared"),
      "@assets": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "client", "src", "assets"),
    },
  },
  root: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "client"),
  build: {
    outDir: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "static-build"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'wouter'],
          three: ['three'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-tooltip'],
        }
      }
    },
  },
  // Amplify-specific configurations
  base: '/',
  define: {
    // Define environment variables for build
    'process.env.VITE_S3_BUCKET_NAME': JSON.stringify(process.env.VITE_S3_BUCKET_NAME || 'smeedies-maritime-assets'),
    'process.env.VITE_AWS_REGION': JSON.stringify(process.env.VITE_AWS_REGION || 'us-east-1'),
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
