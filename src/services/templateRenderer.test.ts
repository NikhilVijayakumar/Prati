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

  it("exports bundled templates through the public API (PKG-001)", async () => {
    const { bundledTemplates, createTemplateRenderer } = await import("../lib");
    const result = await createTemplateRenderer({ templates: bundledTemplates }).render({
      templateName: "otp-email", data: { title: "OTP", name: "Alice", code: "1234" },
    });
    expect(result.success).toBe(true);
    expect(result.html).toContain("1234");
  });

  it("loads a template from a Node base path when absent from the map (PKG-001)", async () => {
    const { createTemplateRenderer } = await import("./templateRenderer");
    const result = await createTemplateRenderer({ basePath, templates: {} }).render({
      templateName: "otp-email", data: { title: "OTP", name: "Alice", code: "1234" },
    });
    expect(result.success).toBe(true);
    expect(result.html).toContain("1234");
  });

  it("renders otp-email template", async () => {
    const res = await renderer.render({ templateName: "otp-email", data: { title: "OTP", name: "Alice", code: "1234" } });
    expect(res.success).toBe(true);
    expect(res.html).toContain("Alice");
    expect(res.html).toContain("1234");
  });
});
