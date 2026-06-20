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

  it("renders default title", () => {
    render(<EntryLayoutFrame><span /></EntryLayoutFrame>);
    expect(screen.getByText("Authentication")).toBeTruthy();
  });

  it("renders custom titleText", () => {
    render(<EntryLayoutFrame titleText="Sign In"><span /></EntryLayoutFrame>);
    expect(screen.getByText("Sign In")).toBeTruthy();
  });
});
