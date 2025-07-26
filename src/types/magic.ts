export interface MagicUserMetadata {
  email: string;
  publicAddress: string;
  issuer: string;
}

export interface AppUser {
  isLoggedIn: boolean;
  metadata: MagicUserMetadata | null;
}

declare global {
  interface ImportMetaEnv {
    VITE_MAGIC_PUBLISHABLE_KEY: string;
    VITE_FIREBASE_API_KEY: string;
    VITE_FIREBASE_AUTH_DOMAIN: string;
    VITE_FIREBASE_PROJECT_ID: string;
    VITE_FIREBASE_STORAGE_BUCKET: string;
    VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    VITE_FIREBASE_APP_ID: string;
    VITE_RAMP_HOST_API_KEY: string;
  }
}
