declare module 'magic-sdk' {
  interface MagicUserMetadata {
    email: string;
    publicAddress: string;
    issuer: string;
  }

  interface MagicInstance {
    auth: {
      loginWithMagicLink(options: { email: string }): Promise<void>;
    };
    user: {
      isLoggedIn(): Promise<boolean>;
      getMetadata(): Promise<MagicUserMetadata>;
      logout(): Promise<void>;
    };
  }

  export class Magic {
    constructor(apiKey: string);
    auth: MagicInstance['auth'];
    user: MagicInstance['user'];
  }
}
