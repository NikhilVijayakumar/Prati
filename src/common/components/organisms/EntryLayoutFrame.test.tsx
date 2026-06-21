import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EntryLayoutFrame } from "./EntryLayoutFrame";

describe("EntryLayoutFrame", () => {
  it("renders children", () => {
    render(
      <EntryLayoutFrame>
        <div data-testid="child">content</div>
      </EntryLayoutFrame>
    );
    expect(screen.getByTestId("child")).toBeTruthy();
  });

  it("renders no title when titleText is omitted", () => {
    const { container } = render(<EntryLayoutFrame><span /></EntryLayoutFrame>);
    expect(container.querySelector(".MuiTypography-root")?.textContent).toBe("");
  });

  it("renders custom titleText", () => {
    render(<EntryLayoutFrame titleText="Sign In"><span /></EntryLayoutFrame>);
    expect(screen.getByText("Sign In")).toBeTruthy();
  });
});
