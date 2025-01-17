import { LoaderContext } from 'webpack';
import { L as LoaderOptions } from './types-riDb5XY2.mjs';
import '@mdx-js/mdx';
import 'gray-matter';
import 'mdast';
import 'next';
import 'react';
import 'rehype-pretty-code';

declare function syncLoader(this: LoaderContext<LoaderOptions>, source: string, callback: (err?: null | Error, content?: string | Buffer) => void): void;

export { syncLoader as default };
