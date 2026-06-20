import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IconDescriptionListItem } from "./IconDescriptionListItem";
import { Zap } from "lucide-react";

const t = (key: string) => key;

describe("IconDescriptionListItem", () => {
  it("renders title and description", () => {
    render(
      <IconDescriptionListItem
        title="Fast Execution"
        description="Run pipelines in parallel"
        Icon={Zap}
        index={0}
        t={t}
      />
    );
    expect(screen.getByText("Fast Execution")).toBeTruthy();
    expect(screen.getByText("Run pipelines in parallel")).toBeTruthy();
  });

  it("renders without crash at different indices", () => {
    const { rerender } = render(
      <IconDescriptionListItem
        title="Feature"
        description="Desc"
        Icon={Zap}
        index={0}
        t={t}
      />
    );
    rerender(
      <IconDescriptionListItem
        title="Feature"
        description="Desc"
        Icon={Zap}
        index={3}
        t={t}
      />
    );
  });
});
