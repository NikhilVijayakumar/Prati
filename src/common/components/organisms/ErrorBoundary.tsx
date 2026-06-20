import { Component, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body1" color="error.main">
            Something went wrong rendering this content.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}
