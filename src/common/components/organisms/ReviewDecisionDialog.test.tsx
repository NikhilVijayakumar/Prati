import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ReviewDecisionDialog, defaultReviewLabels } from "./ReviewDecisionDialog";

const baseProps = {
  isOpen: true,
  mode: "idle" as const,
  entityType: "Signal",
  approveNote: "",
  rejectNote: "",
  onModeChange: vi.fn(),
  onApproveNoteChange: vi.fn(),
  onRejectNoteChange: vi.fn(),
  onApprove: vi.fn(),
  onReject: vi.fn(),
  onCancel: vi.fn(),
  labels: defaultReviewLabels,
};

describe("ReviewDecisionDialog", () => {
  it("does not render when closed", () => {
    render(<ReviewDecisionDialog {...baseProps} isOpen={false} />);
    expect(screen.queryByText("Review Decision")).toBeNull();
  });

  it("renders title and idle actions when open", () => {
    render(<ReviewDecisionDialog {...baseProps} />);
    expect(screen.getByText("Review Decision")).toBeTruthy();
    expect(screen.getByText("Approve")).toBeTruthy();
    expect(screen.getByText("Reject")).toBeTruthy();
  });

  it("shows approve note field in approve mode", () => {
    render(<ReviewDecisionDialog {...baseProps} mode="approve" />);
    expect(screen.getByLabelText("Approval Note (Optional)")).toBeTruthy();
  });

  it("shows reject note field in reject mode", () => {
    render(<ReviewDecisionDialog {...baseProps} mode="reject" />);
    expect(screen.getByLabelText("Rejection Reason (Required)")).toBeTruthy();
  });

  it("calls onModeChange when Approve clicked in idle mode", async () => {
    const onModeChange = vi.fn();
    render(<ReviewDecisionDialog {...baseProps} onModeChange={onModeChange} />);
    await userEvent.click(screen.getByText("Approve"));
    expect(onModeChange).toHaveBeenCalledWith("approve");
  });

  it("renders entityName when provided", () => {
    render(<ReviewDecisionDialog {...baseProps} entityName="Report-42" />);
    expect(screen.getByText(/Report-42/)).toBeTruthy();
  });
});
