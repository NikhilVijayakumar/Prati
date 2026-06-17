import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SummaryPanel } from "./SummaryPanel";

describe("SummaryPanel", () => {
  it("renders title", () => {
    render(<SummaryPanel title="Summary Title" lines={[]} />);
    expect(screen.getByText("Summary Title")).toBeInTheDocument();
  });

  it("renders all lines", () => {
    render(
      <SummaryPanel
        title="Title"
        lines={[{ text: "Line 1" }, { text: "Line 2" }, { text: "Line 3" }]}
      />,
    );
    expect(screen.getByText("Line 1")).toBeInTheDocument();
    expect(screen.getByText("Line 2")).toBeInTheDocument();
    expect(screen.getByText("Line 3")).toBeInTheDocument();
  });

  it("renders line with body2 variant", () => {
    render(
      <SummaryPanel
        title="Title"
        lines={[{ text: "Body text", variant: "body2" }]}
      />,
    );
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("renders line with caption variant", () => {
    render(
      <SummaryPanel
        title="Title"
        lines={[{ text: "Caption text", variant: "caption" }]}
      />,
    );
    expect(screen.getByText("Caption text")).toBeInTheDocument();
  });

  it("renders with default body2 variant", () => {
    render(
      <SummaryPanel title="Title" lines={[{ text: "Default variant" }]} />,
    );
    expect(screen.getByText("Default variant")).toBeInTheDocument();
  });
});
