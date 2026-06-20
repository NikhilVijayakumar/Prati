import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MultiStepProgressIndicator } from "./MultiStepProgressIndicator";

const steps = [
  { id: "step-1", label: "Gather Data" },
  { id: "step-2", label: "Analyze", status: "in-progress" as const },
  { id: "step-3", label: "Report", status: "not-started" as const },
];

describe("MultiStepProgressIndicator", () => {
  it("renders all step labels", () => {
    render(<MultiStepProgressIndicator steps={steps} currentStepId="step-2" />);
    expect(screen.getByText("Gather Data")).toBeTruthy();
    expect(screen.getByText("Analyze")).toBeTruthy();
    expect(screen.getByText("Report")).toBeTruthy();
  });

  it("renders with shortLabel when provided", () => {
    const stepsWithShort = [{ id: "s1", label: "Long Label", shortLabel: "Short" }];
    render(<MultiStepProgressIndicator steps={stepsWithShort} currentStepId="s1" />);
    expect(screen.getByText("Short")).toBeTruthy();
  });
});
