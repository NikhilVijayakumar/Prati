import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { DecisionActionCard } from "./DecisionActionCard";

const baseProps = {
  source: "Model v2",
  description: "Approve this classification.",
  expiryText: "Expires in 2h",
  actions: [
    { label: "Approve", variant: "contained" as const, color: "success" as const },
    { label: "Reject", variant: "outlined" as const, color: "error" as const },
  ],
};

describe("DecisionActionCard", () => {
  it("renders source, description, and expiryText", () => {
    render(<DecisionActionCard {...baseProps} />);
    expect(screen.getByText("Model v2")).toBeTruthy();
    expect(screen.getByText("Approve this classification.")).toBeTruthy();
    expect(screen.getByText("Expires in 2h")).toBeTruthy();
  });

  it("renders action buttons", () => {
    render(<DecisionActionCard {...baseProps} />);
    expect(screen.getByText("Approve")).toBeTruthy();
    expect(screen.getByText("Reject")).toBeTruthy();
  });

  it("calls onClick when action clicked", async () => {
    const onClick = vi.fn();
    render(
      <DecisionActionCard
        {...baseProps}
        actions={[{ label: "Approve", variant: "contained", onClick }]}
      />
    );
    await userEvent.click(screen.getByText("Approve"));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
