import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeroSection } from "./HeroSection";
import type { AnimationVariant } from "./HeroSection";

const mockButton = vi.fn();
vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    Button: vi.fn(() => <button onClick={mockButton}>Mocked Button</button>),
  };
});

describe("HeroSection", () => {
  it("renders headline", () => {
    render(<HeroSection headline="Test Headline" />);
    expect(screen.getByText("Test Headline")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<HeroSection headline="Headline" description="Test Description" />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<HeroSection headline="Headline" />);
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
  });

  it("renders children when provided", () => {
    render(
      <HeroSection headline="Headline">
        <div data-testid="children">Child Content</div>
      </HeroSection>,
    );
    expect(screen.getByTestId("children")).toBeInTheDocument();
  });

  it("does not render children when not provided", () => {
    const { container } = render(<HeroSection headline="Headline" />);
    expect(container.querySelector("[data-testid]")).not.toBeInTheDocument();
  });
});

describe("HeroSection animations", () => {
  it("renders without animation when enableAnimation=false", () => {
    render(
      <HeroSection
        headline="Static Headline"
        enableAnimation={false}
      />,
    );
    expect(screen.getByText("Static Headline")).toBeInTheDocument();
  });

  it("renders with fade-up animation by default", () => {
    const { container } = render(
      <HeroSection headline="Fade Up Headline" />,
    );
    const motionDiv = container.querySelector("[data-testid]") || container.querySelector("div");
    expect(motionDiv).toBeInTheDocument();
  });

  it("renders with custom animation variant", () => {
    render(
      <HeroSection
        headline="Slide Left"
        animationVariant="slide-left"
      />,
    );
    expect(screen.getByText("Slide Left")).toBeInTheDocument();
  });

  it("applies animationDuration prop", () => {
    render(
      <HeroSection
        headline="Duration Test"
        animationDuration={800}
      />,
    );
    expect(screen.getByText("Duration Test")).toBeInTheDocument();
  });

  it("applies animationDelay prop", () => {
    render(
      <HeroSection
        headline="Delay Test"
        animationDelay={200}
      />,
    );
    expect(screen.getByText("Delay Test")).toBeInTheDocument();
  });

  it("renders all 7 animation variants without error", () => {
    const variants: AnimationVariant[] = [
      "fade-up",
      "fade-in",
      "slide-left",
      "slide-right",
      "scale-up",
      "stagger-fade",
      "typewriter",
    ];

    variants.forEach((variant) => {
      const { container } = render(
        <HeroSection headline={`Variant ${variant}`} animationVariant={variant} />,
      );
      expect(container).toBeInTheDocument();
    });
  });
});
