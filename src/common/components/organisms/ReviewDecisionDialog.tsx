import type { ReactElement } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  useTheme as useMuiTheme,
} from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";
import { fonts } from "../../../theme/tokens/typography";

export type ReviewDecisionMode = "idle" | "approve" | "reject";

export interface ReviewDecisionDialogLabels {
  title: string;
  selectAction: string;
  approveLabel: string;
  rejectLabel: string;
  confirmApprove: string;
  confirmReject: string;
  approveNote: string;
  approveNotePlaceholder: string;
  rejectNote: string;
  rejectNotePlaceholder: string;
  noteMinLength: string;
  noteRequired: string;
  cancel: string;
  back: string;
}

export interface ReviewDecisionDialogProps {
  isOpen: boolean;
  mode: ReviewDecisionMode;
  entityType: string;
  entityName?: string;
  entitySummary?: string;
  approveNote: string;
  rejectNote: string;
  onModeChange: (mode: ReviewDecisionMode) => void;
  onApproveNoteChange: (note: string) => void;
  onRejectNoteChange: (note: string) => void;
  onApprove: (reviewNote?: string) => void;
  onReject: (reviewNote: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  minRejectNoteLength?: number;
  labels?: Partial<ReviewDecisionDialogLabels>;
}

const defaultLabels: ReviewDecisionDialogLabels = {
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

export const ReviewDecisionDialog = ({
  isOpen,
  mode,
  entityType,
  entityName,
  entitySummary,
  approveNote,
  rejectNote,
  onModeChange,
  onApproveNoteChange,
  onRejectNoteChange,
  onApprove,
  onReject,
  onCancel,
  isLoading = false,
  minRejectNoteLength = 4,
  labels,
}: ReviewDecisionDialogProps): ReactElement => {
  const muiTheme = useMuiTheme();
  const text = { ...defaultLabels, ...labels };

  const isRejectMode = mode === "reject";
  const isApproveMode = mode === "approve";
  const isRejectNoteFilled = rejectNote.trim().length >= minRejectNoteLength;

  const handleApproveClick = (): void => {
    onApprove(approveNote);
    onCancel();
  };

  const handleRejectClick = (): void => {
    if (isRejectNoteFilled) {
      onReject(rejectNote);
      onCancel();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      aria-labelledby="review-decision-dialog"
    >
      <DialogTitle id="review-decision-dialog">{text.title}</DialogTitle>

      <DialogContent>
        <Stack spacing={spacing.md} sx={{ pt: spacing.md }}>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ mb: spacing.xs }}
            >
              {entityType}
            </Typography>
            {entityName && (
              <Typography variant="body2" color="textSecondary">
                <strong>Name:</strong> {entityName}
              </Typography>
            )}
            {entitySummary && (
              <Box
                sx={{
                  mt: spacing.xs,
                  p: spacing.xs,
                  backgroundColor: "background.default",
                  borderRadius: 1,
                  fontFamily: fonts.mono,
                  fontSize: muiTheme.typography.caption.fontSize,
                  maxHeight: 200,
                  overflowY: "auto",
                  wordBreak: "break-word",
                }}
              >
                <Typography variant="body2" component="pre" sx={{ m: 0 }}>
                  {entitySummary}
                </Typography>
              </Box>
            )}
          </Box>

          {mode === "idle" && (
            <Typography variant="body2" color="textSecondary">
              {text.selectAction}
            </Typography>
          )}

          {isApproveMode && (
            <TextField
              label={text.approveNote}
              placeholder={text.approveNotePlaceholder}
              multiline
              rows={3}
              value={approveNote}
              onChange={(event) => onApproveNoteChange(event.target.value)}
              fullWidth
              disabled={isLoading}
              variant="outlined"
              size="small"
            />
          )}

          {isRejectMode && (
            <TextField
              label={text.rejectNote}
              placeholder={text.rejectNotePlaceholder}
              multiline
              rows={3}
              value={rejectNote}
              onChange={(event) => onRejectNoteChange(event.target.value)}
              fullWidth
              disabled={isLoading}
              variant="outlined"
              size="small"
              error={
                rejectNote.trim().length > 0 &&
                rejectNote.trim().length < minRejectNoteLength
              }
              helperText={
                rejectNote.trim().length > 0 &&
                rejectNote.trim().length < minRejectNoteLength
                  ? text.noteMinLength
                  : text.noteRequired
              }
            />
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: spacing.md }}>
        {mode === "idle" && (
          <>
            <Button onClick={onCancel} disabled={isLoading}>
              {text.cancel}
            </Button>
            <Button
              onClick={() => onModeChange("approve")}
              variant="contained"
              color="success"
              disabled={isLoading}
            >
              {text.approveLabel}
            </Button>
            <Button
              onClick={() => onModeChange("reject")}
              variant="contained"
              color="error"
              disabled={isLoading}
            >
              {text.rejectLabel}
            </Button>
          </>
        )}

        {isApproveMode && (
          <>
            <Button onClick={() => onModeChange("idle")} disabled={isLoading}>
              {text.back}
            </Button>
            <Button
              onClick={handleApproveClick}
              variant="contained"
              color="success"
              disabled={isLoading}
            >
              {text.confirmApprove}
            </Button>
          </>
        )}

        {isRejectMode && (
          <>
            <Button onClick={() => onModeChange("idle")} disabled={isLoading}>
              {text.back}
            </Button>
            <Button
              onClick={handleRejectClick}
              variant="contained"
              color="error"
              disabled={isLoading || !isRejectNoteFilled}
            >
              {text.confirmReject}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
