import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TerminalViewer } from "./TerminalViewer";

vi.mock("../../localization/LanguageContext", () => ({
  useLanguage: () => ({
    literal: { "viewer.waiting_logs": "Waiting for logs..." },
  }),
}));

const logs = [
  { id: 1, timestamp: "10:00:01", level: "INFO", message: "Server started" },
  { id: 2, timestamp: "10:00:02", level: "ERROR", message: "Connection lost" },
];

describe("TerminalViewer", () => {
  it("shows empty message when no logs", () => {
    render(<TerminalViewer logs={[]} />);
    expect(screen.getByText("Waiting for logs...")).toBeTruthy();
  });

  it("renders log entries", () => {
    render(<TerminalViewer logs={logs} />);
    expect(screen.getByText("Server started")).toBeTruthy();
    expect(screen.getByText("Connection lost")).toBeTruthy();
  });

  it("renders log levels", () => {
    render(<TerminalViewer logs={logs} />);
    expect(screen.getByText("INFO")).toBeTruthy();
    expect(screen.getByText("ERROR")).toBeTruthy();
  });

  it("renders custom emptyMessage over literal", () => {
    render(<TerminalViewer logs={[]} emptyMessage="No logs yet" />);
    expect(screen.getByText("No logs yet")).toBeTruthy();
  });
});
