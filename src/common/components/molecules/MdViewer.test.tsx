import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MdViewer } from "./MdViewer";
import { LanguageContext } from "../../localization/LanguageContext";

const renderWithLang = (ui: React.ReactElement) =>
  render(
    <LanguageContext.Provider
      value={{
        currentLanguage: "en",
        setCurrentLanguage: () => {},
        literal: {
          "viewer.empty_markdown": "No markdown content available for preview.",
          "msg.loading": "Loading...",
        },
        availableLanguages: [{ code: "en", label: "English" }],
      }}
    >
      {ui}
    </LanguageContext.Provider>,
  );

describe("MdViewer", () => {
  it("renders file name as heading", () => {
    renderWithLang(<MdViewer fileName="readme.md" />);
    expect(screen.getByText("readme.md")).toBeInTheDocument();
  });

  it("renders markdown content", async () => {
    renderWithLang(<MdViewer fileName="readme.md" fileContent="# Hello" />);
    const heading = await screen.findByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Hello");
  });

  it("shows empty message when no content", () => {
    renderWithLang(<MdViewer fileName="readme.md" />);
    expect(screen.getByText("No markdown content available for preview.")).toBeInTheDocument();
  });

  it("shows empty message for whitespace-only content", () => {
    renderWithLang(<MdViewer fileName="readme.md" fileContent="   " />);
    expect(screen.getByText("No markdown content available for preview.")).toBeInTheDocument();
  });
});
