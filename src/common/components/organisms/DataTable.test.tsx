import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataTable } from "./DataTable";

type Row = { id: string; name: string; status: string };

const columns = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "status", label: "Status" },
];

const data: Row[] = [
  { id: "1", name: "Alpha", status: "active" },
  { id: "2", name: "Beta", status: "inactive" },
];

describe("DataTable", () => {
  it("renders column headers", () => {
    render(<DataTable columns={columns} data={data} keyField="id" />);
    expect(screen.getByText("ID")).toBeTruthy();
    expect(screen.getByText("Name")).toBeTruthy();
    expect(screen.getByText("Status")).toBeTruthy();
  });

  it("renders row data", () => {
    render(<DataTable columns={columns} data={data} keyField="id" />);
    expect(screen.getByText("Alpha")).toBeTruthy();
    expect(screen.getByText("Beta")).toBeTruthy();
  });

  it("renders with aria-label", () => {
    render(
      <DataTable columns={columns} data={data} keyField="id" aria-label="test table" />
    );
    expect(screen.getByRole("table", { name: "test table" })).toBeTruthy();
  });

  it("renders custom cell via render prop", () => {
    const customColumns = [
      ...columns,
      {
        id: "custom",
        label: "Custom",
        render: (_row: Row) => <span>custom-cell</span>,
      },
    ];
    render(
      <DataTable
        columns={customColumns}
        data={[{ id: "1", name: "A", status: "ok" }]}
        keyField="id"
      />
    );
    expect(screen.getByText("custom-cell")).toBeTruthy();
  });
});
