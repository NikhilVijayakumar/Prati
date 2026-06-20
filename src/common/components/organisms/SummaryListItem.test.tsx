import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SummaryListItem } from "./SummaryListItem";

describe("SummaryListItem", () => {
  it("renders id, summary, source", () => {
    render(
      <SummaryListItem
        id="S-001"
        summary="High-risk transaction detected"
        source="fraud-detector"
        classification="CRITICAL"
      />
    );
    expect(screen.getByText("S-001")).toBeTruthy();
    expect(screen.getByText("High-risk transaction detected")).toBeTruthy();
    expect(screen.getByText("fraud-detector")).toBeTruthy();
  });

  it("renders with different classification levels", () => {
    const { rerender } = render(
      <SummaryListItem id="1" summary="x" source="src" classification="WARNING" />
    );
    rerender(
      <SummaryListItem id="1" summary="x" source="src" classification="INFO" />
    );
  });
});
