import { z } from 'zod';
import { M as MdxFile, b as PageMapItem, F as Folder } from './types-Ap4r_ONm.mjs';
import 'gray-matter';
import 'mdast';

declare const pageThemeSchema: z.ZodObject<{
    breadcrumb: z.ZodBoolean;
    collapsed: z.ZodBoolean;
    footer: z.ZodBoolean;
    layout: z.ZodEnum<["default", "full", "raw"]>;
    navbar: z.ZodBoolean;
    pagination: z.ZodBoolean;
    sidebar: z.ZodBoolean;
    timestamp: z.ZodBoolean;
    toc: z.ZodBoolean;
    typesetting: z.ZodEnum<["default", "article"]>;
}, "strict", z.ZodTypeAny, {
    footer: boolean;
    layout: "default" | "full" | "raw";
    breadcrumb: boolean;
    collapsed: boolean;
    navbar: boolean;
    pagination: boolean;
    sidebar: boolean;
    timestamp: boolean;
    toc: boolean;
    typesetting: "article" | "default";
}, {
    footer: boolean;
    layout: "default" | "full" | "raw";
    breadcrumb: boolean;
    collapsed: boolean;
    navbar: boolean;
    pagination: boolean;
    sidebar: boolean;
    timestamp: boolean;
    toc: boolean;
    typesetting: "article" | "default";
}>;
type PageTheme = z.infer<typeof pageThemeSchema>;
/**
 * An option to control how an item should be displayed in the sidebar:
 * - `normal`: the default behavior, item will be displayed
 * - `hidden`: the item will not be displayed in the sidebar entirely
 * - `children`: if the item is a folder, itself will be hidden but all its children will still be processed
 */
declare const displaySchema: z.ZodEnum<["normal", "hidden", "children"]>;
declare const menuItemSchema: z.ZodObject<{
    display: z.ZodOptional<z.ZodEnum<["normal", "hidden", "children"]>>;
    items: z.ZodRecord<z.ZodString, z.ZodObject<{
        title: z.ZodString;
        href: z.ZodOptional<z.ZodString>;
        newWindow: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        title: string;
        href?: string | undefined;
        newWindow?: boolean | undefined;
    }, {
        title: string;
        href?: string | undefined;
        newWindow?: boolean | undefined;
    }>>;
    title: z.ZodString;
    type: z.ZodLiteral<"menu">;
}, "strict", z.ZodTypeAny, {
    type: "menu";
    title: string;
    items: Record<string, {
        title: string;
        href?: string | undefined;
        newWindow?: boolean | undefined;
    }>;
    display?: "children" | "hidden" | "normal" | undefined;
}, {
    type: "menu";
    title: string;
    items: Record<string, {
        title: string;
        href?: string | undefined;
        newWindow?: boolean | undefined;
    }>;
    display?: "children" | "hidden" | "normal" | undefined;
}>;
type Display = z.infer<typeof displaySchema>;
type IMenuItem = z.infer<typeof menuItemSchema>;
declare const metaSchema: z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodObject<{
    display: z.ZodOptional<z.ZodEnum<["normal", "hidden", "children"]>>;
    items: z.ZodRecord<z.ZodString, z.ZodObject<{
        title: z.ZodString;
        href: z.ZodOptional<z.ZodString>;
        newWindow: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        title: string;
        href?: string | undefined;
        newWindow?: boolean | undefined;
    }, {
        title: string;
        href?: string | undefined;
        newWindow?: boolean | undefined;
    }>>;
    title: z.ZodString;
    type: z.ZodLiteral<"menu">;
}, "strict", z.ZodTypeAny, {
    type: "menu";
    title: string;
    items: Record<string, {
        title: string;
        href?: string | undefined;
        newWindow?: boolean | undefined;
    }>;
    display?: "children" | "hidden" | "normal" | undefined;
}, {
    type: "menu";
    title: string;
    items: Record<string, {
        title: string;
        href?: string | undefined;
        newWindow?: boolean | undefined;
    }>;
    display?: "children" | "hidden" | "normal" | undefined;
}>]>, z.ZodObject<{
    title: z.ZodString;
    type: z.ZodLiteral<"separator">;
}, "strict", z.ZodTypeAny, {
    type: "separator";
    title: string;
}, {
    type: "separator";
    title: string;
}>]>, z.ZodObject<{
    href: z.ZodOptional<z.ZodString>;
    newWindow: z.ZodOptional<z.ZodBoolean>;
    display: z.ZodOptional<z.ZodEnum<["normal", "hidden", "children"]>>;
    theme: z.ZodOptional<z.ZodObject<{
        breadcrumb: z.ZodOptional<z.ZodBoolean>;
        collapsed: z.ZodOptional<z.ZodBoolean>;
        footer: z.ZodOptional<z.ZodBoolean>;
        layout: z.ZodOptional<z.ZodEnum<["default", "full", "raw"]>>;
        navbar: z.ZodOptional<z.ZodBoolean>;
        pagination: z.ZodOptional<z.ZodBoolean>;
        sidebar: z.ZodOptional<z.ZodBoolean>;
        timestamp: z.ZodOptional<z.ZodBoolean>;
        toc: z.ZodOptional<z.ZodBoolean>;
        typesetting: z.ZodOptional<z.ZodEnum<["default", "article"]>>;
    }, "strict", z.ZodTypeAny, {
        breadcrumb?: boolean | undefined;
        collapsed?: boolean | undefined;
        footer?: boolean | undefined;
        layout?: "default" | "full" | "raw" | undefined;
        navbar?: boolean | undefined;
        pagination?: boolean | undefined;
        sidebar?: boolean | undefined;
        timestamp?: boolean | undefined;
        toc?: boolean | undefined;
        typesetting?: "article" | "default" | undefined;
    }, {
        breadcrumb?: boolean | undefined;
        collapsed?: boolean | undefined;
        footer?: boolean | undefined;
        layout?: "default" | "full" | "raw" | undefined;
        navbar?: boolean | undefined;
        pagination?: boolean | undefined;
        sidebar?: boolean | undefined;
        timestamp?: boolean | undefined;
        toc?: boolean | undefined;
        typesetting?: "article" | "default" | undefined;
    }>>;
    title: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["page", "doc"]>>;
}, "strict", z.ZodTypeAny, {
    href?: string | undefined;
    newWindow?: boolean | undefined;
    display?: "children" | "hidden" | "normal" | undefined;
    theme?: {
        breadcrumb?: boolean | undefined;
        collapsed?: boolean | undefined;
        footer?: boolean | undefined;
        layout?: "default" | "full" | "raw" | undefined;
        navbar?: boolean | undefined;
        pagination?: boolean | undefined;
        sidebar?: boolean | undefined;
        timestamp?: boolean | undefined;
        toc?: boolean | undefined;
        typesetting?: "article" | "default" | undefined;
    } | undefined;
    title?: string | undefined;
    type?: "page" | "doc" | undefined;
}, {
    href?: string | undefined;
    newWindow?: boolean | undefined;
    display?: "children" | "hidden" | "normal" | undefined;
    theme?: {
        breadcrumb?: boolean | undefined;
        collapsed?: boolean | undefined;
        footer?: boolean | undefined;
        layout?: "default" | "full" | "raw" | undefined;
        navbar?: boolean | undefined;
        pagination?: boolean | undefined;
        sidebar?: boolean | undefined;
        timestamp?: boolean | undefined;
        toc?: boolean | undefined;
        typesetting?: "article" | "default" | undefined;
    } | undefined;
    title?: string | undefined;
    type?: "page" | "doc" | undefined;
}>]>;
type FolderWithoutChildren = Omit<Folder, 'children'>;
type Item = (MdxFile | FolderWithoutChildren) & {
    title: string;
    type: string;
    children?: Item[];
    display?: Display;
    withIndexPage?: boolean;
    theme?: PageTheme;
    isUnderCurrentDocsTree?: boolean;
};
type PageItem = (MdxFile | FolderWithoutChildren) & {
    title: string;
    type: string;
    href?: string;
    newWindow?: boolean;
    children?: PageItem[];
    firstChildRoute?: string;
    display?: Display;
    withIndexPage?: boolean;
    isUnderCurrentDocsTree?: boolean;
};
type MenuItem = (MdxFile | FolderWithoutChildren) & IMenuItem & {
    children?: PageItem[];
};
type DocsItem = (MdxFile | FolderWithoutChildren) & {
    title: string;
    type: string;
    children?: DocsItem[];
    firstChildRoute?: string;
    withIndexPage?: boolean;
    isUnderCurrentDocsTree?: boolean;
};
declare function normalizePages({ list, locale, defaultLocale, route, docsRoot, underCurrentDocsRoot, pageThemeContext }: {
    list: PageMapItem[];
    locale: string;
    defaultLocale?: string;
    route: string;
    docsRoot?: string;
    underCurrentDocsRoot?: boolean;
    pageThemeContext?: PageTheme;
}): {
    activeType: string | undefined;
    activeIndex: number;
    activeThemeContext: {
        footer: boolean;
        layout: "default" | "full" | "raw";
        breadcrumb: boolean;
        collapsed: boolean;
        navbar: boolean;
        pagination: boolean;
        sidebar: boolean;
        timestamp: boolean;
        toc: boolean;
        typesetting: "article" | "default";
    };
    activePath: Item[];
    directories: Item[];
    flatDirectories: Item[];
    docsDirectories: DocsItem[];
    flatDocsDirectories: DocsItem[];
    topLevelNavbarItems: PageItem[];
};

export { type Item, type MenuItem, type PageItem, type PageTheme, metaSchema, normalizePages };
