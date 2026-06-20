import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CanvasGroup } from "./CanvasGroup";

describe("CanvasGroup", () => {
  it("renders label in input", () => {
    const { container } = render(
      <CanvasGroup label="My Group" description="Some description" />
    );
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.defaultValue).toBe("My Group");
  });

  it("renders description in textarea", () => {
    const { container } = render(
      <CanvasGroup label="Group" description="Details here" />
    );
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.defaultValue).toBe("Details here");
  });

  it("renders children", () => {
    render(
      <CanvasGroup label="G" description="">
        <div data-testid="child">inner</div>
      </CanvasGroup>
    );
    expect(screen.getByTestId("child")).toBeTruthy();
  });
});
