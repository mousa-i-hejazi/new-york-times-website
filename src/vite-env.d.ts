/// <reference types="vite/client" />

// Type declaration for Vite environment variables
interface ImportMetaEnv {
  readonly VITE_NYT_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
