import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { FileTree, type FileTreeNode } from "./FileTree";

const nodes: FileTreeNode[] = [
  {
    id: "folder-1",
    name: "src",
    type: "folder",
    childrenNodes: [
      { id: "file-1", name: "index.ts", type: "file" },
    ],
  },
  { id: "file-2", name: "README.md", type: "file" },
];

describe("FileTree", () => {
  it("renders top-level nodes", () => {
    render(
      <FileTree
        nodes={nodes}
        expandedIds={new Set()}
        selectedId={null}
        onToggle={vi.fn()}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByText("src")).toBeTruthy();
    expect(screen.getByText("README.md")).toBeTruthy();
  });

  it("shows children when folder is expanded", () => {
    render(
      <FileTree
        nodes={nodes}
        expandedIds={new Set(["folder-1"])}
        selectedId={null}
        onToggle={vi.fn()}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByText("index.ts")).toBeTruthy();
  });

  it("calls onToggle when folder clicked", async () => {
    const onToggle = vi.fn();
    render(
      <FileTree
        nodes={nodes}
        expandedIds={new Set()}
        selectedId={null}
        onToggle={onToggle}
        onSelect={vi.fn()}
      />
    );
    await userEvent.click(screen.getByText("src"));
    expect(onToggle).toHaveBeenCalledWith("folder-1");
  });

  it("calls onSelect when file clicked", async () => {
    const onSelect = vi.fn();
    render(
      <FileTree
        nodes={nodes}
        expandedIds={new Set()}
        selectedId={null}
        onToggle={vi.fn()}
        onSelect={onSelect}
      />
    );
    await userEvent.click(screen.getByText("README.md"));
    expect(onSelect).toHaveBeenCalledWith("file-2");
  });
});
