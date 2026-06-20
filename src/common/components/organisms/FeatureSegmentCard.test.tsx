import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FeatureSegmentCard } from "./FeatureSegmentCard";
import { Shield } from "lucide-react";

const t = (key: string) => key;

describe("FeatureSegmentCard", () => {
  it("renders title and subTitle", () => {
    render(
      <FeatureSegmentCard
        title="Security"
        subTitle="enterprise.security"
        color="#ff0000"
        Icon={Shield}
        index={0}
        t={t}
      />
    );
    expect(screen.getByText("Security")).toBeTruthy();
    expect(screen.getByText("enterprise.security")).toBeTruthy();
  });

  it("renders tags", () => {
    render(
      <FeatureSegmentCard
        title="AI"
        subTitle="Powered"
        color="#00ff00"
        Icon={Shield}
        tags={["tag.speed", "tag.scale"]}
        index={1}
        t={t}
      />
    );
    expect(screen.getByText("tag.speed")).toBeTruthy();
    expect(screen.getByText("tag.scale")).toBeTruthy();
  });
});
