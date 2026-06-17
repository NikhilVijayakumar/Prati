import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Notification } from "./Notification";

const mockHandleClose = vi.fn();

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    Snackbar: vi.fn(({ children, open }) =>
      open ? <div data-testid="snackbar">{children}</div> : null,
    ),
    Alert: vi.fn(({ children, onClose }) => (
      <div data-testid="alert" onClick={onClose}>
        {children}
      </div>
    )),
  };
});

describe("Notification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders message when open", () => {
    render(
      <Notification
        open={true}
        message="Test message"
        onClose={mockHandleClose}
      />,
    );
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Notification
        open={false}
        message="Test message"
        onClose={mockHandleClose}
      />,
    );
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });

  it("renders with info severity by default", () => {
    render(
      <Notification
        open={true}
        message="Info message"
        onClose={mockHandleClose}
      />,
    );
    expect(screen.getByTestId("alert")).toBeInTheDocument();
  });

  it("renders with custom severity", () => {
    render(
      <Notification
        open={true}
        message="Error message"
        severity="error"
        onClose={mockHandleClose}
      />,
    );
    expect(screen.getByTestId("alert")).toBeInTheDocument();
  });

  it("calls onClose when alert is clicked", async () => {
    render(
      <Notification open={true} message="Click me" onClose={mockHandleClose} />,
    );
    screen.getByTestId("alert").click();
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
