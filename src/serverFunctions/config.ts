import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";
import { resolveDataforseoBasicToken } from "@/server/lib/dataforseoCredentials";

export const getSeoApiKeyStatus = createServerFn({ method: "GET" })
  .middleware(requireAuthenticatedContext)
  .handler(() => {
    let configured = true;

    try {
      resolveDataforseoBasicToken(env.DATAFORSEO_API_KEY);
    } catch {
      configured = false;
    }

    return { configured };
  });
