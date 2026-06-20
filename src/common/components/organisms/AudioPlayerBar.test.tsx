import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import userEvent from "@testing-library/user-event";
import { AudioPlayerBar } from "./AudioPlayerBar";

beforeAll(() => {
  Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
    writable: true,
    value: vi.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
    writable: true,
    value: vi.fn(),
  });
  Object.defineProperty(window.HTMLMediaElement.prototype, "load", {
    writable: true,
    value: vi.fn(),
  });
});

const baseProps = {
  title: "Midnight Jazz",
  category: "Jazz",
  duration: "4:20",
  coverUrl: "https://example.com/cover.jpg",
  audioUrl: "https://example.com/track.mp3",
  isPlaying: false,
  onTogglePlay: vi.fn(),
};

describe("AudioPlayerBar", () => {
  it("renders title, category and duration", () => {
    render(<AudioPlayerBar {...baseProps} />);
    expect(screen.getByText("Midnight Jazz")).toBeTruthy();
    expect(screen.getAllByText(/Jazz/).length).toBeGreaterThan(0);
    expect(screen.getByText(/4:20/)).toBeTruthy();
  });

  it("renders cover image", () => {
    render(<AudioPlayerBar {...baseProps} />);
    expect(screen.getByAltText("Midnight Jazz")).toBeTruthy();
  });

  it("calls onTogglePlay when play button clicked", async () => {
    const onTogglePlay = vi.fn();
    render(<AudioPlayerBar {...baseProps} onTogglePlay={onTogglePlay} />);
    const buttons = screen.getAllByRole("button");
    // Middle button (index 1) is the play/pause control
    await userEvent.click(buttons[1]);
    expect(onTogglePlay).toHaveBeenCalled();
  });
});
