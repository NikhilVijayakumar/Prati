import { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  /** Optional localized error message. Overrides the default English fallback text. */
  localizedFallbackText?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary] Caught render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body1" color="error.main">
            {this.props.localizedFallbackText ?? 'Something went wrong rendering this content.'}
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}
