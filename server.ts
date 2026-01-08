import { CommonEngine } from '@angular/ssr/node';
import { APP_BASE_HREF } from '@angular/common';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import express from 'express';
import bootstrap from './src/main.server';

// Create a CommonEngine for pre-rendering
const commonEngine = new CommonEngine({
    bootstrap,
});

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const server = express();
const port = process.env['PORT'] || 4000;

server.set('view engine', 'html');
server.set('views', browserDistFolder);

server.get(
    '**',
    express.static(browserDistFolder, {
        maxAge: '1y',
        index: 'index.html',
    })
);

server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    commonEngine
        .render({
            documentFilePath: indexHtml,
            url: `${protocol}://${headers.host}${originalUrl}`,
            publicPath: browserDistFolder,
            providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then((html) => res.send(html))
        .catch((err) => next(err));
});

server.listen(port, () => {
    console.log(
        `Node Express server listening on http://localhost:${port}`
    );
});
