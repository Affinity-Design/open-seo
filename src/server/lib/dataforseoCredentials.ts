import { AppError } from "@/server/lib/errors";

const DATAFORSEO_CONFIG_ERROR_MESSAGE =
  "DATAFORSEO_API_KEY must contain a complete DataForSEO login and password.";

function isCompleteDataforseoCredentialPair(credentials: string) {
  const separatorIndex = credentials.indexOf(":");
  return separatorIndex > 0 && separatorIndex < credentials.length - 1;
}

function encodeDataforseoCredentials(credentials: string) {
  try {
    return btoa(credentials);
  } catch {
    throw new AppError(
      "DATAFORSEO_CONFIG_ERROR",
      DATAFORSEO_CONFIG_ERROR_MESSAGE,
    );
  }
}

function decodeDataforseoToken(token: string) {
  try {
    return atob(token);
  } catch {
    return null;
  }
}

export function resolveDataforseoBasicToken(value: string | null | undefined) {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    throw new AppError(
      "DATAFORSEO_CONFIG_ERROR",
      DATAFORSEO_CONFIG_ERROR_MESSAGE,
    );
  }

  if (trimmedValue.includes(":")) {
    if (!isCompleteDataforseoCredentialPair(trimmedValue)) {
      throw new AppError(
        "DATAFORSEO_CONFIG_ERROR",
        DATAFORSEO_CONFIG_ERROR_MESSAGE,
      );
    }

    return encodeDataforseoCredentials(trimmedValue);
  }

  const decodedCredentials = decodeDataforseoToken(trimmedValue);
  if (
    !decodedCredentials ||
    !isCompleteDataforseoCredentialPair(decodedCredentials)
  ) {
    throw new AppError(
      "DATAFORSEO_CONFIG_ERROR",
      DATAFORSEO_CONFIG_ERROR_MESSAGE,
    );
  }

  return trimmedValue;
}
