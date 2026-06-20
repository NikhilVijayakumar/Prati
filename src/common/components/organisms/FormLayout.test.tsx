import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormLayout } from "./FormLayout";

describe("FormLayout", () => {
  it("renders children", () => {
    render(
      <FormLayout>
        <input data-testid="field" />
      </FormLayout>
    );
    expect(screen.getByTestId("field")).toBeTruthy();
  });

  it("renders title when provided", () => {
    render(<FormLayout title="My Form"><span /></FormLayout>);
    expect(screen.getByText("My Form")).toBeTruthy();
  });

  it("renders actions when provided", () => {
    render(
      <FormLayout actions={<button>Submit</button>}>
        <span />
      </FormLayout>
    );
    expect(screen.getByText("Submit")).toBeTruthy();
  });

  it("omits title and actions when not provided", () => {
    const { queryByText } = render(<FormLayout><span /></FormLayout>);
    expect(queryByText("Submit")).toBeNull();
  });
});
