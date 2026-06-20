import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { StatusActionCard } from "./StatusActionCard";

vi.mock("../../localization/LanguageContext", () => ({
  useLanguage: () => ({
    literal: {
      "time.last_checked": "Last checked",
      "ui.connect": "Connect",
      "msg.loading": "Loading...",
    },
  }),
}));

const baseProps = {
  id: "svc-1",
  title: "Database",
  subtitle: "Primary PostgreSQL instance",
  statusLabel: "Online",
  statusColor: "success" as const,
};

describe("StatusActionCard", () => {
  it("renders title, subtitle, and status label", () => {
    render(<StatusActionCard {...baseProps} />);
    expect(screen.getByText("Database")).toBeTruthy();
    expect(screen.getByText("Primary PostgreSQL instance")).toBeTruthy();
    expect(screen.getByText("Online")).toBeTruthy();
  });

  it("renders delete button when onDelete provided", () => {
    const onDelete = vi.fn();
    const { container } = render(<StatusActionCard {...baseProps} onDelete={onDelete} />);
    expect(container.querySelector('[data-testid="DeleteIcon"]')).toBeTruthy();
  });

  it("calls onDelete with id when delete clicked", async () => {
    const onDelete = vi.fn();
    render(<StatusActionCard {...baseProps} onDelete={onDelete} />);
    // Delete button is the only button when only onDelete is provided
    await userEvent.click(screen.getByRole("button"));
    expect(onDelete).toHaveBeenCalledWith("svc-1");
  });

  it("renders last checked text when provided", () => {
    render(<StatusActionCard {...baseProps} lastChecked="2m ago" />);
    expect(screen.getByText(/2m ago/)).toBeTruthy();
  });
});
