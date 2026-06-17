import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";

export type StatusColorType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default";

export interface StatusActionCardProps {
  id: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  statusColor: StatusColorType;
  lastChecked?: string;
  lastCheckedLabel?: string;
  isConnectDisabled?: boolean;
  onDelete?: (id: string) => void;
  onConnect?: (id: string) => Promise<void> | void;
  onCheckStatus?: (id: string) => Promise<void> | void;
  connectLabel?: string;
  loadingLabel?: string;
}

export const StatusActionCard: React.FC<StatusActionCardProps> = ({
  id,
  title,
  subtitle,
  statusLabel,
  statusColor,
  lastChecked,
  lastCheckedLabel,
  isConnectDisabled = false,
  onDelete,
  onConnect,
  onCheckStatus,
  connectLabel,
  loadingLabel,
}) => {
  const { literal } = useLanguage();
  const [isChecking, setIsChecking] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const labelLastChecked = literal["time.last_checked"] || lastCheckedLabel;
  const labelConnect = literal["ui.connect"] || connectLabel;
  const labelLoading = literal["msg.loading"] || loadingLabel;

  const handleCheckStatus = async () => {
    if (!onCheckStatus) return;
    setIsChecking(true);
    try {
      await onCheckStatus(id);
    } finally {
      setIsChecking(false);
    }
  };

  const handleConnect = async () => {
    if (!onConnect) return;
    setIsConnecting(true);
    try {
      await onConnect(id);
    } finally {
      setIsConnecting(false);
    }
  };

  const getStatusColor = (): string => {
    switch (statusColor) {
      case "success":
        return 'success.main';
      case "error":
        return 'error.main';
      case "warning":
        return 'warning.main';
      case "info":
        return 'info.main';
      default:
        return 'text.secondary';
    }
  };

  const statusColorValue = getStatusColor();

  return (
    <Card
      elevation={0}
      sx={{
        mb: spacing.md,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          backgroundColor: statusColorValue,
        },
      }}
    >
      <CardContent sx={{ pl: spacing.lg }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: spacing.md }}
            >
              {subtitle}
            </Typography>

            <Box display="flex" alignItems="center" gap={spacing.sm}>
              <Chip
                label={statusLabel}
                size="small"
                sx={{
                  bgcolor: `${statusColorValue}20`,
                  color: statusColorValue,
                  fontWeight: 700,
                  border: `1px solid ${statusColorValue}`,
                }}
              />
              {onCheckStatus && (
                <IconButton
                  size="small"
                  onClick={handleCheckStatus}
                  disabled={isChecking}
                  sx={{ ml: spacing.sm }}
                >
                  <RefreshIcon
                    fontSize="small"
                    sx={{
                      animation: isChecking
                        ? "spin 1s linear infinite"
                        : "none",
                      "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                </IconButton>
              )}

              {lastChecked && (
                <Typography variant="caption" color="text.disabled">
                  {labelLastChecked}: {lastChecked}
                </Typography>
              )}
            </Box>
          </Box>

          <Box display="flex" gap={1}>
            {onDelete && (
              <IconButton
                onClick={() => onDelete(id)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            )}
            {onConnect && (
              <Button
                variant="contained"
                startIcon={!isConnecting && <PowerSettingsNewIcon />}
                onClick={handleConnect}
                disabled={isConnectDisabled || isConnecting}
                sx={{
                  minWidth: 120,
                  opacity: !isConnectDisabled ? 1 : 0.6,
                }}
              >
                {isConnecting ? labelLoading : labelConnect}
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
