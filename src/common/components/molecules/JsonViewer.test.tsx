import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { JsonViewer } from "./JsonViewer";
import { LanguageContext } from "../../localization/LanguageContext";

vi.mock("react-syntax-highlighter", () => ({
  Prism: ({ children }: { children: string }) => <pre data-testid="syntax-hl">{children}</pre>,
}));
vi.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  vscDarkPlus: {},
}));

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
  it("renders file name", async () => {
    renderWithLang(<JsonViewer fileName="data.json" />);
    expect(await screen.findByText("data.json")).toBeInTheDocument();
  });

  it("shows empty state when no content", async () => {
    renderWithLang(<JsonViewer fileName="data.json" />);
    expect(await screen.findByText(/No JSON content available for preview\./)).toBeInTheDocument();
  });

  it("renders valid JSON content", async () => {
    renderWithLang(
      <JsonViewer fileName="data.json" fileContent='{"key": "value"}' />,
    );
    expect(await screen.findByText(/"key"/)).toBeInTheDocument();
  });
});
