import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";
import { resolveDataforseoBasicToken } from "@/server/lib/dataforseoCredentials";

type DataforseoApiKeyIssue = "missing" | "invalid";

export const getSeoApiKeyStatus = createServerFn({ method: "GET" })
  .middleware(requireAuthenticatedContext)
  .handler(() => {
    const value = env.DATAFORSEO_API_KEY?.trim();

    if (!value) {
      return {
        configured: false,
        issue: "missing" as DataforseoApiKeyIssue,
      };
    }

    try {
      resolveDataforseoBasicToken(value);
    } catch {
      return {
        configured: false,
        issue: "invalid" as DataforseoApiKeyIssue,
      };
    }

    return { configured: true, issue: null };
  });
