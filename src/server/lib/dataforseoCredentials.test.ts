import { describe, expect, it } from "vitest";
import { AppError } from "@/server/lib/errors";
import { resolveDataforseoBasicToken } from "./dataforseoCredentials";

describe("resolveDataforseoBasicToken", () => {
  it("accepts a complete base64 login and password", () => {
    const token = btoa("user@example.com:api-password");

    expect(resolveDataforseoBasicToken(token)).toBe(token);
  });

  it("accepts raw login and password credentials", () => {
    expect(resolveDataforseoBasicToken("user@example.com:api-password")).toBe(
      btoa("user@example.com:api-password"),
    );
  });

  it("rejects an empty password", () => {
    expect(() =>
      resolveDataforseoBasicToken(btoa("user@example.com:")),
    ).toThrow(AppError);
  });

  it("rejects missing and malformed values", () => {
    expect(() => resolveDataforseoBasicToken(undefined)).toThrow(AppError);
    expect(() => resolveDataforseoBasicToken("not-base64")).toThrow(AppError);
  });
});
