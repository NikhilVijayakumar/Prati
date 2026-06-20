import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FileViewerRouter } from "./FileViewerRouter";

vi.mock("../../localization/LanguageContext", () => ({
  useLanguage: () => ({
    literal: {
      "viewer.unsupported": "Unsupported file type",
      "viewer.extension": "Extension",
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

vi.mock("../molecules/MdViewer", () => ({
  MdViewer: ({ fileName }: { fileName: string }) => <div data-testid="md-viewer">{fileName}</div>,
}));

vi.mock("../molecules/ImageViewer", () => ({
  ImageViewer: ({ fileName }: { fileName: string }) => <div data-testid="img-viewer">{fileName}</div>,
}));

vi.mock("../molecules/JsonViewer", () => ({
  JsonViewer: ({ fileName }: { fileName: string }) => <div data-testid="json-viewer">{fileName}</div>,
}));

describe("FileViewerRouter", () => {
  it("routes .md to MdViewer", () => {
    render(<FileViewerRouter fileName="notes.md" fileContent="# Hello" />);
    expect(screen.getByTestId("md-viewer")).toBeTruthy();
  });

  it("routes .json to JsonViewer", () => {
    render(<FileViewerRouter fileName="data.json" fileContent="{}" />);
    expect(screen.getByTestId("json-viewer")).toBeTruthy();
  });

  it("routes .png to ImageViewer", () => {
    render(<FileViewerRouter fileName="photo.png" />);
    expect(screen.getByTestId("img-viewer")).toBeTruthy();
  });

  it("routes .csv to DataTable-based CsvViewer", () => {
    const csv = "a,b\n1,2";
    render(<FileViewerRouter fileName="data.csv" fileContent={csv} />);
    expect(screen.getByText("data.csv")).toBeTruthy();
  });

  it("shows unsupported message for unknown extension", () => {
    render(<FileViewerRouter fileName="archive.zip" />);
    expect(screen.getByText("Unsupported file type")).toBeTruthy();
  });
});
