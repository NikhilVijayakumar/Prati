import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { motionValue } from "framer-motion";
import { AnimatedHeroCharacter } from "./AnimatedHeroCharacter";

const t = (key: string) => key;

describe("AnimatedHeroCharacter", () => {
  it("renders the character", () => {
    render(
      <AnimatedHeroCharacter
        char="A"
        mouseX={motionValue(0)}
        mouseY={motionValue(0)}
        index={0}
        zIndex={1}
        t={t}
      />
    );
    expect(screen.getByTestId("animated-hero-character")).toBeTruthy();
    expect(screen.getByText("A")).toBeTruthy();
  });

  it("renders title when provided", () => {
    render(
      <AnimatedHeroCharacter
        char="B"
        title="hero.title"
        mouseX={motionValue(0)}
        mouseY={motionValue(0)}
        index={1}
        zIndex={2}
        t={t}
      />
    );
    expect(screen.getByText("hero.title")).toBeTruthy();
  });
});
