import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { InteractiveStepNode } from "./InteractiveStepNode";
import { Star } from "lucide-react";

describe("InteractiveStepNode", () => {
  it("renders label and description", () => {
    render(
      <InteractiveStepNode
        label="Ingest"
        description="Load the data"
        Icon={Star}
        isActive={false}
        onClick={vi.fn()}
        index={0}
      />
    );
    expect(screen.getByText("Ingest")).toBeTruthy();
    expect(screen.getByText("Load the data")).toBeTruthy();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(
      <InteractiveStepNode
        label="Process"
        description="Transform data"
        Icon={Star}
        isActive={true}
        onClick={onClick}
        index={1}
      />
    );
    await userEvent.click(screen.getByText("Process"));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
