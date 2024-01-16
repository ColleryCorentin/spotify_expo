# expo-app-auth

> Source code for the deprecated `expo-app-auth` package.

Expo App Auth API provided native bindings to the iOS and Android libraries named `AppAuth-iOS` and `AppAuth-Android` respectively. Due to the nature of authentication, developer needs are often changing and require many small compromises. To account for this, we created a more flexible package [`expo-auth-session`](https://docs.expo.dev/guides/authentication/) which implements the [OAuth spec](https://datatracker.ietf.org/doc/html/rfc6749) in TypeScript, utilizing native primitives like `expo-crypto` for [PKCE](https://oauth.net/2/pkce/), `expo-linking` for redirecting back to the app, `expo-web-browser` for secure web authentication, etc.

- Documentation: [SDK 44 AppAuth](https://github.com/expo/expo/blob/sdk-44/docs/pages/versions/v44.0.0/sdk/app-auth.md).
