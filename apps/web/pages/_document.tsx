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
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/favicons/favicon-32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={`${basePath}/favicons/favicon-192.png`}
        />
        <link
          rel="shortcut icon"
          href={`${basePath}/favicons/favicon-32.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${basePath}/favicons/apple-touch-icon.png`}
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
