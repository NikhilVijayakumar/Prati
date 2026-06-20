import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VerticalStepIndicator } from "./VerticalStepIndicator";

describe("VerticalStepIndicator", () => {
  it("renders without crash", () => {
    const { container } = render(
      <VerticalStepIndicator activeIndex={0} totalSteps={3} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders correct number of step dots", () => {
    const { container } = render(
      <VerticalStepIndicator activeIndex={1} totalSteps={4} />
    );
    const dots = container.querySelectorAll('[class*="MuiBox"]');
    expect(dots.length).toBeGreaterThan(0);
  });
});
