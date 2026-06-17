import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusDot } from "./StatusDot";

describe("StatusDot", () => {
  it("renders with ok tone", () => {
    const { container } = render(<StatusDot tone="ok" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with warning tone", () => {
    const { container } = render(<StatusDot tone="warning" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with error tone", () => {
    const { container } = render(<StatusDot tone="error" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with executing tone", () => {
    const { container } = render(<StatusDot tone="executing" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with waiting tone", () => {
    const { container } = render(<StatusDot tone="waiting" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with default tone", () => {
    const { container } = render(<StatusDot tone="default" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    const { container } = render(<StatusDot tone="ok" size={20} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    const { container } = render(<StatusDot tone="ok" />);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
