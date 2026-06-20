import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary";

const ThrowingComponent = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Safe content")).toBeTruthy();
  });

  it("renders default fallback box on error", () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(container.querySelector(".MuiBox-root")).toBeTruthy();
  });

  it("renders custom fallback when provided", () => {
    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("Custom error UI")).toBeTruthy();
  });

  it("renders localizedFallbackText when provided", () => {
    render(
      <ErrorBoundary localizedFallbackText="Fehler aufgetreten">
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("Fehler aufgetreten")).toBeTruthy();
  });
});
