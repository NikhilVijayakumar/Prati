import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusListRow } from "./StatusListRow";

describe("StatusListRow", () => {
  it("renders domain and statusLine", () => {
    render(
      <StatusListRow domain="Auth" statusLine="All systems go" health="success" />
    );
    expect(screen.getByText("Auth")).toBeTruthy();
    expect(screen.getByText("All systems go")).toBeTruthy();
  });

  it("renders without crash for each health tone", () => {
    const { rerender } = render(
      <StatusListRow domain="A" statusLine="ok" health="error" />
    );
    rerender(<StatusListRow domain="A" statusLine="ok" health="warning" />);
    rerender(<StatusListRow domain="A" statusLine="ok" health="default" />);
  });
});
