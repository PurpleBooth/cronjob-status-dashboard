import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="text-neutral-800 dark:text-neutral-100 dark:from-gray-900 dark:via-purple-900 dark:to-violet-600 bg-gradient-to-b from-gray-50 via-purple-50 to-violet-300 min-h-screen font-sans subpixel-antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
