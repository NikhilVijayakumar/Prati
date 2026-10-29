import path from "path";
import { describe, it, expect, beforeAll } from "vitest";
import type { TemplateRendererService } from "../types/template.types";

describe("templateRenderer", () => {
  const basePath = path.resolve(__dirname, "../templates");
  let renderer: TemplateRendererService;

  beforeAll(async () => {
    const mod = await import("./templateRenderer");
    renderer = mod.createTemplateRenderer({ basePath });
  });

  it("renders otp-email template", async () => {
    const res = await renderer.render({ templateName: "otp-email", data: { title: "OTP", name: "Alice", code: "1234" } });
    expect(res.success).toBe(true);
    expect(res.html).toContain("Alice");
    expect(res.html).toContain("1234");
  });
});
