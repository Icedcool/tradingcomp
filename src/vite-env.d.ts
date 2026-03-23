/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TOKEN_FETH_ADDRESS: string;
  readonly VITE_TOKEN_FT564_ADDRESS: string;
  readonly VITE_PAIR_V2_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
