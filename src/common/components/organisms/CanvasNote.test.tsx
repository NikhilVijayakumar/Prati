import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { CanvasNote } from "./CanvasNote";

describe("CanvasNote", () => {
  it("renders NOTE label", () => {
    render(<CanvasNote label="Hello world" />);
    expect(screen.getByText("NOTE")).toBeTruthy();
  });

  it("renders markdown label content", () => {
    render(<CanvasNote label="Hello world" />);
    expect(screen.getByText("Hello world")).toBeTruthy();
  });

  it("renders double-click placeholder when label is empty", () => {
    render(<CanvasNote label="" />);
    expect(screen.getByText("Double-click to edit")).toBeTruthy();
  });

  it("switches to input on double-click", async () => {
    const { container } = render(<CanvasNote label="My note" />);
    await userEvent.dblClick(container.firstChild as Element);
    const input = container.querySelector("textarea");
    expect(input).toBeTruthy();
  });
});
