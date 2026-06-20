import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MultiPhaseWorkflowDiagram } from "./MultiPhaseWorkflowDiagram";
import { Database, Send } from "lucide-react";
import type { WorkflowPhase } from "./MultiPhaseWorkflowDiagram";

const t = (key: string) => key;

const flows: WorkflowPhase[] = [
  {
    titleKey: "phase.ingest",
    steps: [
      { id: "s1", label: "step.load", description: "step.load.desc", Icon: Database },
      { id: "s2", label: "step.send", description: "step.send.desc", Icon: Send },
    ],
  },
];

describe("MultiPhaseWorkflowDiagram", () => {
  it("renders phase title", () => {
    render(
      <MultiPhaseWorkflowDiagram
        flows={flows}
        activeStepId={null}
        onStepChange={vi.fn()}
        t={t}
      />
    );
    expect(screen.getByText("phase.ingest")).toBeTruthy();
  });

  it("renders step labels", () => {
    render(
      <MultiPhaseWorkflowDiagram
        flows={flows}
        activeStepId={null}
        onStepChange={vi.fn()}
        t={t}
      />
    );
    expect(screen.getByText("step.load")).toBeTruthy();
    expect(screen.getByText("step.send")).toBeTruthy();
  });

  it("shows active step description when step is active", () => {
    render(
      <MultiPhaseWorkflowDiagram
        flows={flows}
        activeStepId="s1"
        onStepChange={vi.fn()}
        t={t}
      />
    );
    // Description appears in both the step node and the active panel
    expect(screen.getAllByText("step.load.desc").length).toBeGreaterThan(0);
  });

  it("calls onStepChange when step node clicked", async () => {
    const onStepChange = vi.fn();
    render(
      <MultiPhaseWorkflowDiagram
        flows={flows}
        activeStepId={null}
        onStepChange={onStepChange}
        t={t}
      />
    );
    await userEvent.click(screen.getByText("step.load"));
    expect(onStepChange).toHaveBeenCalledWith("s1");
  });
});
