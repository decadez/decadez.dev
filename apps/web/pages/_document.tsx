import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  const basePath = process.env.GITHUB_PAGES === "true" ? "/decadez.dev" : "";

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        {/* Favicons */}
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${basePath}/favicons/favicon.svg`}
        />
        <link rel="manifest" href={`${basePath}/favicons/site.webmanifest`} />
        <link
          rel="mask-icon"
          href={`${basePath}/favicons/favicon.svg`}
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#5bbad5" />
        <meta name="theme-color" content="#1d2a35" />

        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-bglight dark:bg-bgdark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
