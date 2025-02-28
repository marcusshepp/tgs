import { CommonEngine } from '@angular/ssr/node';
import bootstrap from './src/main.server';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

// Create a CommonEngine for pre-rendering
const commonEngine = new CommonEngine();

// For Netlify, we're removing the handler function since we're going full static

// Keep Express server for local development
if (process.env['NODE_ENV'] === 'development') {
    const express = require('express');
    const { APP_BASE_HREF } = require('@angular/common');

    const server = express();
    const port = process.env['PORT'] || 4000;

    const serverDistFolder = dirname(fileURLToPath(import.meta.url));
    const browserDistFolder = resolve(serverDistFolder, '../browser');
    const indexHtml = join(serverDistFolder, 'index.server.html');

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
        console.log(
            `Node Express server listening on http://localhost:${port}`
        );
    });
}
