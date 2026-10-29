import type { ReviewDecisionDialogLabels } from "./ReviewDecisionDialog";

export const defaultReviewLabels: ReviewDecisionDialogLabels = {
  title: "Review Decision",
  selectAction: "Choose an action below.",
  approveLabel: "Approve",
  rejectLabel: "Reject",
  confirmApprove: "Confirm Approve",
  confirmReject: "Confirm Reject",
  approveNote: "Approval Note (Optional)",
  approveNotePlaceholder: "Record optional feedback...",
  rejectNote: "Rejection Reason (Required)",
  rejectNotePlaceholder:
    "Explain why this is rejected so follow-up is actionable...",
  noteMinLength: "Minimum 4 characters required",
  noteRequired: "Required: provide feedback for improvement",
  cancel: "Cancel",
  back: "Back",
};
