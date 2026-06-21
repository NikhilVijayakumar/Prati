import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { VersionHistorySelector } from "./VersionHistorySelector";

const entries = [
  { version: 1, createdAt: "2024-01-01T10:00:00Z" },
  { version: 2, createdAt: "2024-01-02T10:00:00Z" },
  { version: 3, createdAt: "2024-01-03T10:00:00Z" },
];

describe("VersionHistorySelector", () => {
  it("returns null when entries has 1 or fewer items", () => {
    const { container } = render(
      <VersionHistorySelector
        entries={[{ version: 1, createdAt: "2024-01-01T00:00:00Z" }]}
        selectedVersion={1}
        latestVersion={1}
        onVersionChange={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders version count label", () => {
    render(
      <VersionHistorySelector
        entries={entries}
        selectedVersion={3}
        latestVersion={3}
        onVersionChange={vi.fn()}
        versionsLabel="versions"
        availableLabel="available"
      />
    );
    expect(screen.getByText(/3 versions/)).toBeTruthy();
  });

  it("shows custom availableLabel", () => {
    render(
      <VersionHistorySelector
        entries={entries}
        selectedVersion={3}
        latestVersion={3}
        onVersionChange={vi.fn()}
        availableLabel="in archive"
      />
    );
    expect(screen.getByText(/in archive/)).toBeTruthy();
  });
});
