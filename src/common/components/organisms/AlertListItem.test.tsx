import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AlertListItem } from "./AlertListItem";

const baseProps = {
  id: "alert-1",
  source: "Auth Service",
  timestamp: "2024-01-15T10:30:00Z",
  message: "Login failed 3 times",
  severity: "WARNING" as const,
  read: false,
};

describe("AlertListItem", () => {
  it("renders source and message", () => {
    render(<AlertListItem {...baseProps} />);
    expect(screen.getByText("Auth Service")).toBeTruthy();
    expect(screen.getByText("Login failed 3 times")).toBeTruthy();
  });

  it("renders CRITICAL severity", () => {
    render(<AlertListItem {...baseProps} severity="CRITICAL" />);
    expect(screen.getByText("Auth Service")).toBeTruthy();
  });

  it("renders INFO severity", () => {
    render(<AlertListItem {...baseProps} severity="INFO" />);
    expect(screen.getByText("Auth Service")).toBeTruthy();
  });

  it("renders read state without crash", () => {
    render(<AlertListItem {...baseProps} read={true} />);
    expect(screen.getByText("Login failed 3 times")).toBeTruthy();
  });
});
