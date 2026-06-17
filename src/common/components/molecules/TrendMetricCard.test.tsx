import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TrendMetricCard } from "./TrendMetricCard";

describe("TrendMetricCard", () => {
  it("renders label", () => {
    render(<TrendMetricCard label="Revenue" value="$1000" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("renders string value", () => {
    render(<TrendMetricCard label="Label" value="$1000" />);
    expect(screen.getByText("$1000")).toBeInTheDocument();
  });

  it("renders number value", () => {
    render(<TrendMetricCard label="Label" value={1000} />);
    expect(screen.getByText("1000")).toBeInTheDocument();
  });

  it("renders trend value when provided", () => {
    render(
      <TrendMetricCard
        label="Label"
        value="100"
        trendValue="+10%"
        trend="up"
      />,
    );
    expect(screen.getByText("+10%")).toBeInTheDocument();
  });

  it("does not render trend when trendValue is not provided", () => {
    render(<TrendMetricCard label="Label" value="100" trend="up" />);
    expect(screen.queryByText(/^\+.*%$/)).not.toBeInTheDocument();
  });

  it("renders with up trend", () => {
    render(
      <TrendMetricCard label="Label" value="100" trendValue="+5%" trend="up" />,
    );
    expect(screen.getByText("+5%")).toBeInTheDocument();
  });

  it("renders with down trend", () => {
    render(
      <TrendMetricCard
        label="Label"
        value="100"
        trendValue="-5%"
        trend="down"
      />,
    );
    expect(screen.getByText("-5%")).toBeInTheDocument();
  });

  it("renders with neutral trend", () => {
    render(
      <TrendMetricCard
        label="Label"
        value="100"
        trendValue="0%"
        trend="neutral"
      />,
    );
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});
