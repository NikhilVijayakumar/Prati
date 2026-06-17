import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SeverityBadge } from "./SeverityBadge";

describe("SeverityBadge", () => {
  it("renders CRITICAL level", () => {
    render(<SeverityBadge level="CRITICAL" />);
    expect(screen.getByText("CRITICAL")).toBeInTheDocument();
  });

  it("renders WARNING level", () => {
    render(<SeverityBadge level="WARNING" />);
    expect(screen.getByText("WARNING")).toBeInTheDocument();
  });

  it("renders URGENT level", () => {
    render(<SeverityBadge level="URGENT" />);
    expect(screen.getByText("URGENT")).toBeInTheDocument();
  });

  it("renders INFO level", () => {
    render(<SeverityBadge level="INFO" />);
    expect(screen.getByText("INFO")).toBeInTheDocument();
  });

  it("renders SUCCESS level", () => {
    render(<SeverityBadge level="SUCCESS" />);
    expect(screen.getByText("SUCCESS")).toBeInTheDocument();
  });

  it("renders custom level", () => {
    render(<SeverityBadge level="CUSTOM" />);
    expect(screen.getByText("CUSTOM")).toBeInTheDocument();
  });

  it("renders unknown level as info", () => {
    render(<SeverityBadge level="UNKNOWN" />);
    expect(screen.getByText("UNKNOWN")).toBeInTheDocument();
  });
});
