import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { paraglideMiddleware } from "#/paraglide/server.js";

const handler = createStartHandler(defaultStreamHandler);

export default {
  async fetch(request: Request) {
    return paraglideMiddleware(request, () => {
      // Pass ORIGINAL request — the router's rewrite handles deLocalization.
      // The middleware still sets the locale context via AsyncLocalStorage.
      return handler(request);
    });
  },
};
