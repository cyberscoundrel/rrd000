// src/components/callout.tsx
import cn from "clsx";
import { InformationCircleIcon } from "../icons";
import { jsx, jsxs } from "react/jsx-runtime";
var TypeToEmoji = {
  default: "\u{1F4A1}",
  error: "\u{1F6AB}",
  info: /* @__PURE__ */ jsx(InformationCircleIcon, { className: "nx-mt-1" }),
  warning: "\u26A0\uFE0F"
};
var classes = {
  default: cn(
    "nx-border-orange-100 nx-bg-orange-50 nx-text-orange-800 dark:nx-border-orange-400/30 dark:nx-bg-orange-400/20 dark:nx-text-orange-300"
  ),
  error: cn(
    "nx-border-red-200 nx-bg-red-100 nx-text-red-900 dark:nx-border-red-200/30 dark:nx-bg-red-900/30 dark:nx-text-red-200"
  ),
  info: cn(
    "nx-border-blue-200 nx-bg-blue-100 nx-text-blue-900 dark:nx-border-blue-200/30 dark:nx-bg-blue-900/30 dark:nx-text-blue-200"
  ),
  warning: cn(
    "nx-border-yellow-100 nx-bg-yellow-50 nx-text-yellow-900 dark:nx-border-yellow-200/30 dark:nx-bg-yellow-700/30 dark:nx-text-yellow-200"
  )
};
function Callout({
  children,
  type = "default",
  emoji = TypeToEmoji[type]
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "nextra-callout nx-overflow-x-auto nx-mt-6 nx-flex nx-rounded-lg nx-border nx-py-2 ltr:nx-pr-4 rtl:nx-pl-4",
        "contrast-more:nx-border-current contrast-more:dark:nx-border-current",
        classes[type]
      ),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "nx-select-none nx-text-xl ltr:nx-pl-3 ltr:nx-pr-2 rtl:nx-pr-3 rtl:nx-pl-2",
            style: {
              fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
            },
            children: emoji
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "nx-w-full nx-min-w-0 nx-leading-7", children })
      ]
    }
  );
}
export {
  Callout
};
