import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { JsonViewer } from "./JsonViewer";
import { LanguageContext } from "../../localization/LanguageContext";

const renderWithLang = (ui: React.ReactElement) =>
  render(
    <LanguageContext.Provider
      value={{
        currentLanguage: "en",
        setCurrentLanguage: () => {},
        literal: {
          "viewer.empty_json": "No JSON content available for preview.",
          "msg.loading": "Loading...",
        },
        availableLanguages: [{ code: "en", label: "English" }],
      }}
    >
      {ui}
    </LanguageContext.Provider>,
  );

describe("JsonViewer", () => {
  it("renders file name", () => {
    renderWithLang(<JsonViewer fileName="data.json" />);
    expect(screen.getByText("data.json")).toBeInTheDocument();
  });

  it("shows empty state when no content", () => {
    renderWithLang(<JsonViewer fileName="data.json" />);
    expect(screen.getByText("No JSON content available for preview.")).toBeInTheDocument();
  });

  it("renders valid JSON content", async () => {
    const { container } = renderWithLang(
      <JsonViewer fileName="data.json" fileContent='{"key": "value"}' />,
    );
    const code = await screen.findByText(/"key"/);
    expect(code).toBeInTheDocument();
  });
});
