import { Html, Head, Main, NextScript } from "next/document";

const themeScript = `
(function () {
  try {
    var theme = window.localStorage.getItem("decadez-docs-theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  } catch (error) {
    document.documentElement.classList.add("light");
  }
})();
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#f9fafb" />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
