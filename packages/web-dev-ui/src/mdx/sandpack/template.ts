export const template = {
  "/src/index.js": {
    hidden: true,
    code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  },
  "/package.json": {
    hidden: true,
    code: JSON.stringify(
      {
        name: "web-dev-ui-sandbox",
        version: "0.0.0",
        main: "/src/index.js",
        scripts: {
          start: "react-scripts start",
          build: "react-scripts build",
          test: "react-scripts test --env=jsdom",
          eject: "react-scripts eject",
        },
        dependencies: {
          "@decadez/web-dev-ui": "latest",
          react: "^19.2.7",
          "react-dom": "^19.2.7",
          "react-scripts": "^5.0.0",
        },
      },
      null,
      2
    ),
  },
  "/public/index.html": {
    hidden: true,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>web-dev-ui sandbox</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  },
};
