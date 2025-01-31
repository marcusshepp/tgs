import { CommonEngine } from "@angular/ssr/node";
import { render } from "@netlify/angular-runtime/common-engine";
import bootstrap from "./src/main.server";

const commonEngine = new CommonEngine();

export async function netlifyCommonEngineHandler(
  request: Request,
  context: any,
): Promise<Response> {
  return await render(commonEngine);
}

// Keep the Express server for local development
if (process.env["NODE_ENV"] === "development") {
  const express = require("express");
  const { APP_BASE_HREF } = require("@angular/common");
  const { fileURLToPath } = require("node:url");
  const { dirname, join, resolve } = require("node:path");

  const server = express();
  const port = process.env["PORT"] || 4000;

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, "../browser");
  const indexHtml = join(serverDistFolder, "index.server.html");

  server.set("view engine", "html");
  server.set("views", browserDistFolder);

  server.get(
    "**",
    express.static(browserDistFolder, {
      maxAge: "1y",
      index: "index.html",
    }),
  );

  server.get("**", (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
