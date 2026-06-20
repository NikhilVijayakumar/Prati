import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WeeklyReportCard } from "./WeeklyReportCard";

const labels = {
  improvedTitle: "Improvements",
  slipsTitle: "Slips",
  risksTitle: "Risks",
  emptyImproved: "No improvements",
  emptySlips: "No slips",
  emptyRisks: "No risks",
};

describe("WeeklyReportCard", () => {
  it("renders owner and domain", () => {
    render(
      <WeeklyReportCard
        owner="Alice"
        domain="Engineering"
        improvements={[]}
        slips={[]}
        risks={[]}
        labels={labels}
      />
    );
    expect(screen.getByText("Alice")).toBeTruthy();
    expect(screen.getByText("Engineering")).toBeTruthy();
  });

  it("renders improvements list", () => {
    render(
      <WeeklyReportCard
        owner="Bob"
        domain="QA"
        improvements={["Faster deploys", "Better coverage"]}
        slips={[]}
        risks={[]}
        labels={labels}
      />
    );
    expect(screen.getByText("Faster deploys")).toBeTruthy();
    expect(screen.getByText("Better coverage")).toBeTruthy();
  });

  it("shows empty message when no improvements", () => {
    render(
      <WeeklyReportCard
        owner="Carol"
        domain="Ops"
        improvements={[]}
        slips={[]}
        risks={[]}
        labels={labels}
      />
    );
    expect(screen.getByText("No improvements")).toBeTruthy();
  });

  it("renders custom metric", () => {
    render(
      <WeeklyReportCard
        owner="Dave"
        domain="Data"
        customMetricLabel="Score"
        customMetricValue="95"
        improvements={[]}
        slips={[]}
        risks={[]}
        labels={labels}
      />
    );
    expect(screen.getByText("Score")).toBeTruthy();
    expect(screen.getByText("95")).toBeTruthy();
  });
});
