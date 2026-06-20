import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimelineNode } from "./TimelineNode";

const t = (key: string) => key;

describe("TimelineNode", () => {
  it("renders phase and title", () => {
    render(
      <TimelineNode
        phase="Phase 1"
        title="feature.launch"
        description="feature.launch.desc"
        category="core"
        status="active"
        t={t}
      />
    );
    expect(screen.getByText(/Phase 1/)).toBeTruthy();
    expect(screen.getByText("feature.launch")).toBeTruthy();
  });

  it("renders tags when provided", () => {
    render(
      <TimelineNode
        phase="Q1"
        title="title.key"
        description="desc.key"
        category="infra"
        status="planned"
        tags={["tag.one", "tag.two"]}
        t={t}
      />
    );
    expect(screen.getByText("tag.one")).toBeTruthy();
    expect(screen.getByText("tag.two")).toBeTruthy();
  });
});
