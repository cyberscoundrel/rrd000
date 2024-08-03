import { FC } from 'react';
import Nextra from './layout.mjs';
import { F as Folder, D as DynamicMetaJsonFile, P as PageOpts, T as ThemeConfig, a as DynamicMetaDescriptor } from './types-Ap4r_ONm.mjs';
import 'gray-matter';
import 'mdast';

declare function collectCatchAllRoutes(parent: Folder<any>, meta: DynamicMetaJsonFile, isRootFolder?: boolean): void;
declare function setupNextraPage({ pageNextRoute, pageOpts, nextraLayout, themeConfig, MDXContent, hot, pageOptsChecksum, dynamicMetaModules }: {
    pageNextRoute: string;
    pageOpts: PageOpts;
    nextraLayout: FC;
    themeConfig: ThemeConfig;
    MDXContent: FC;
    hot?: __WebpackModuleApi.Hot;
    pageOptsChecksum?: string;
    dynamicMetaModules?: [Promise<any>, DynamicMetaDescriptor][];
}): typeof Nextra;

export { collectCatchAllRoutes, setupNextraPage };
