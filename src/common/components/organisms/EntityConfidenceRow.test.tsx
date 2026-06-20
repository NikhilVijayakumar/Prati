import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EntityConfidenceRow } from "./EntityConfidenceRow";

const baseProps = {
  id: "E-001",
  title: "Signal Alpha",
  secondaryLabel: "Category A",
  statusTag: "active",
  confidence: 87,
  confidenceLabel: "High",
};

describe("EntityConfidenceRow", () => {
  it("renders without crash", () => {
    render(<EntityConfidenceRow {...baseProps} />);
  });

  it("displays id, title and confidence", () => {
    render(<EntityConfidenceRow {...baseProps} />);
    expect(screen.getByText("E-001")).toBeTruthy();
    expect(screen.getByText("Signal Alpha")).toBeTruthy();
    expect(screen.getByText("87%")).toBeTruthy();
  });

  it("shows statusTag uppercased", () => {
    render(<EntityConfidenceRow {...baseProps} />);
    expect(screen.getByText("ACTIVE")).toBeTruthy();
  });
});
