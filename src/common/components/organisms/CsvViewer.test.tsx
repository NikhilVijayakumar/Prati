import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CsvViewer } from "./CsvViewer";

vi.mock("../../localization/LanguageContext", () => ({
  useLanguage: () => ({
    literal: {
      "viewer.empty_csv": "No CSV data",
      "pagination.rows_per_page": "Rows per page:",
      "pagination.displayed_rows": "{from}–{to} of {count}",
      "pagination.first_page": "first page",
      "pagination.last_page": "last page",
      "pagination.next_page": "next page",
      "pagination.previous_page": "previous page",
    },
  }),
}));

const csvContent = "name,age,city\nAlice,30,NYC\nBob,25,LA";

describe("CsvViewer", () => {
  it("renders file name", () => {
    render(<CsvViewer fileName="data.csv" fileContent={csvContent} />);
    expect(screen.getByText("data.csv")).toBeTruthy();
  });

  it("renders CSV headers as columns", () => {
    render(<CsvViewer fileName="data.csv" fileContent={csvContent} />);
    expect(screen.getByText("name")).toBeTruthy();
    expect(screen.getByText("age")).toBeTruthy();
    expect(screen.getByText("city")).toBeTruthy();
  });

  it("renders CSV row data", () => {
    render(<CsvViewer fileName="data.csv" fileContent={csvContent} />);
    expect(screen.getByText("Alice")).toBeTruthy();
    expect(screen.getByText("Bob")).toBeTruthy();
  });

  it("shows empty message when no fileContent", () => {
    render(<CsvViewer fileName="empty.csv" />);
    expect(screen.getByText("No CSV data")).toBeTruthy();
  });
});
