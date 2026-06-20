import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { PlayableMediaCard } from "./PlayableMediaCard";

const t = (key: string) => key;

const baseProps = {
  title: "track.title",
  category: "Jazz",
  duration: "3:45",
  coverUrl: "https://example.com/cover.jpg",
  isPlaying: false,
  onPlay: vi.fn(),
  t,
};

describe("PlayableMediaCard", () => {
  it("renders category and duration", () => {
    render(<PlayableMediaCard {...baseProps} />);
    expect(screen.getByText(/Jazz/)).toBeTruthy();
    expect(screen.getByText(/3:45/)).toBeTruthy();
  });

  it("renders artist when provided", () => {
    render(<PlayableMediaCard {...baseProps} artist="artist.name" />);
    expect(screen.getByText("artist.name")).toBeTruthy();
  });

  it("calls onPlay when card clicked", async () => {
    const onPlay = vi.fn();
    render(<PlayableMediaCard {...baseProps} onPlay={onPlay} />);
    await userEvent.click(screen.getByAltText("track.title"));
    expect(onPlay).toHaveBeenCalledOnce();
  });
});
