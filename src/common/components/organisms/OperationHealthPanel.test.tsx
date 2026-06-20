import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { OperationHealthPanel } from "./OperationHealthPanel";

const baseProps = {
  title: "Pipeline Health",
  summaryItems: [
    { label: "Uptime", value: "99.9%" },
    { label: "Errors", value: "0", tone: "success" as const },
  ],
};

describe("OperationHealthPanel", () => {
  it("renders title and summary items", () => {
    render(<OperationHealthPanel {...baseProps} />);
    expect(screen.getByText("Pipeline Health")).toBeTruthy();
    expect(screen.getByText("Uptime")).toBeTruthy();
    expect(screen.getByText("99.9%")).toBeTruthy();
  });

  it("renders subtitle when provided", () => {
    render(<OperationHealthPanel {...baseProps} subtitle="Last updated 1m ago" />);
    expect(screen.getByText("Last updated 1m ago")).toBeTruthy();
  });

  it("renders action buttons", () => {
    const onClick = vi.fn();
    render(
      <OperationHealthPanel
        {...baseProps}
        actions={[{ id: "a1", label: "Refresh", onClick }]}
      />
    );
    expect(screen.getByText("Refresh")).toBeTruthy();
  });

  it("renders footer text", () => {
    render(<OperationHealthPanel {...baseProps} footerText="Updated 5s ago" />);
    expect(screen.getByText("Updated 5s ago")).toBeTruthy();
  });
});
