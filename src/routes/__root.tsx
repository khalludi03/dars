import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { getLocale } from "#/paraglide/runtime";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

/**
 * Blocking inline script that runs before first paint.
 * Reads saved theme from localStorage, detects system color scheme,
 * and applies data-theme on <html> immediately to prevent FOUC.
 */
const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('aq-t');var mode=(s==='light'||s==='dark'||s==='system')?s:'system';var dark=window.matchMedia('(prefers-color-scheme:dark)').matches;var resolved=mode==='system'?(dark?'dark':'light'):mode;document.documentElement.setAttribute('data-theme',resolved);document.documentElement.style.colorScheme=resolved}catch(e){}})();`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", getLocale());
    }
  },

  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dars" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [{ tag: "script" as const, children: THEME_INIT_SCRIPT }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
