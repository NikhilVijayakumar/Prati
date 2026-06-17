import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <div data-testid="card-content">Card Content</div>
      </Card>,
    );
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Card title="Test Title">Content</Card>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders supporting text when provided", () => {
    render(<Card supportingText="Supporting text">Content</Card>);
    expect(screen.getByText("Supporting text")).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    render(
      <Card action={<button data-testid="action-btn">Action</button>}>
        Content
      </Card>,
    );
    expect(screen.getByTestId("action-btn")).toBeInTheDocument();
  });

  it("renders without title", () => {
    const { container } = render(<Card>Content only</Card>);
    expect(
      container.querySelector('[class*="subtitle1"]'),
    ).not.toBeInTheDocument();
  });

  it("renders without action", () => {
    const { container } = render(<Card>Content only</Card>);
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });
});
