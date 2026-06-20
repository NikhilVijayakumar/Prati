import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProfileRevealCard } from "./ProfileRevealCard";

const t = (key: string) => key;

const baseProps = {
  name: "Alice Chen",
  nameKey: "profile.alice.name",
  role: "profile.alice.role",
  bio: "profile.alice.bio",
  imageUrl: "https://example.com/alice.jpg",
  themeColor: "#4f46e5",
  t,
};

describe("ProfileRevealCard", () => {
  it("renders name and role via t()", () => {
    render(<ProfileRevealCard {...baseProps} />);
    expect(screen.getByText("profile.alice.name")).toBeTruthy();
    expect(screen.getByText("profile.alice.role")).toBeTruthy();
  });

  it("renders primary badge when provided", () => {
    render(<ProfileRevealCard {...baseProps} primaryBadge="badge.vp" />);
    expect(screen.getByText("badge.vp")).toBeTruthy();
  });

  it("renders image with alt text from name", () => {
    render(<ProfileRevealCard {...baseProps} />);
    expect(screen.getByAltText("Alice Chen")).toBeTruthy();
  });
});
