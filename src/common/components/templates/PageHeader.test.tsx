import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PageHeader } from "./PageHeader";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    Button: vi.fn(({ children, onClick, disabled, variant, size }) => (
      <button
        data-testid="header-button"
        onClick={onClick}
        disabled={disabled}
        data-variant={variant}
        data-size={size}
      >
        {children}
      </button>
    )),
  };
});

describe("PageHeader", () => {
  it("renders title", () => {
    render(<PageHeader title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<PageHeader title="Title" subtitle="Test Subtitle" />);
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders primary action when provided", () => {
    render(<PageHeader title="Title" primaryAction={{ label: "Primary" }} />);
    expect(screen.getByText("Primary")).toBeInTheDocument();
  });

  it("renders secondary action when provided", () => {
    render(
      <PageHeader title="Title" secondaryAction={{ label: "Secondary" }} />,
    );
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  });

  it("renders leading meta when provided", () => {
    render(
      <PageHeader
        title="Title"
        leadingMeta={<span data-testid="leading">Leading</span>}
      />,
    );
    expect(screen.getByTestId("leading")).toBeInTheDocument();
  });

  it("renders trailing meta when provided", () => {
    render(
      <PageHeader
        title="Title"
        trailingMeta={<span data-testid="trailing">Trailing</span>}
      />,
    );
    expect(screen.getByTestId("trailing")).toBeInTheDocument();
  });

  it("calls primaryAction onClick when clicked", () => {
    const onClick = vi.fn();
    render(
      <PageHeader title="Title" primaryAction={{ label: "Click", onClick }} />,
    );
    screen.getByText("Click").click();
    expect(onClick).toHaveBeenCalled();
  });

  it("renders disabled primary action", () => {
    render(
      <PageHeader
        title="Title"
        primaryAction={{ label: "Disabled", disabled: true }}
      />,
    );
    expect(screen.getByTestId("header-button")).toBeDisabled();
  });
});
