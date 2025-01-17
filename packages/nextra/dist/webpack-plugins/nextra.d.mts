import { Compiler } from 'webpack';
import { N as NextraConfig } from '../types-riDb5XY2.mjs';
import '@mdx-js/mdx';
import 'gray-matter';
import 'mdast';
import 'next';
import 'react';
import 'rehype-pretty-code';

declare class NextraPlugin {
    private config;
    constructor(config: NextraConfig & {
        locales: string[];
    });
    apply(compiler: Compiler): void;
}

export { NextraPlugin };
