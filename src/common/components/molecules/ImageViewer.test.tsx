import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ImageViewer } from "./ImageViewer";
import { LanguageContext } from "../../localization/LanguageContext";

const renderWithLang = (ui: React.ReactElement) =>
  render(
    <LanguageContext.Provider
      value={{
        currentLanguage: "en",
        setCurrentLanguage: () => {},
        literal: { "viewer.empty_image": "No image content available for preview." },
        availableLanguages: [{ code: "en", label: "English" }],
      }}
    >
      {ui}
    </LanguageContext.Provider>,
  );

describe("ImageViewer", () => {
  it("renders file name", () => {
    renderWithLang(<ImageViewer fileName="photo.png" />);
    expect(screen.getByText("photo.png")).toBeInTheDocument();
  });

  it("shows placeholder when no content", () => {
    renderWithLang(<ImageViewer fileName="photo.png" />);
    expect(screen.getByText("No image content available for preview.")).toBeInTheDocument();
  });

  it("shows placeholder when encoding is not base64", () => {
    renderWithLang(<ImageViewer fileName="photo.png" fileContent="abc" fileEncoding="text" />);
    expect(screen.getByText("No image content available for preview.")).toBeInTheDocument();
  });

  it("renders image when base64 content provided", () => {
    renderWithLang(<ImageViewer fileName="photo.png" fileContent="iVBORw0KGgo=" fileEncoding="base64" mimeType="image/png" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "data:image/png;base64,iVBORw0KGgo=");
  });

  it("defaults to image/png when mimeType not provided", () => {
    renderWithLang(<ImageViewer fileName="photo.png" fileContent="abc" fileEncoding="base64" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "data:image/png;base64,abc");
  });

  it("uses fileName as alt text", () => {
    renderWithLang(<ImageViewer fileName="photo.png" fileContent="abc" fileEncoding="base64" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "photo.png");
  });

  it("zooms in on zoom in button click", () => {
    renderWithLang(<ImageViewer fileName="photo.png" fileContent="abc" fileEncoding="base64" />);
    const zoomInBtn = screen.getAllByRole("button")[0];
    fireEvent.click(zoomInBtn);
    const img = screen.getByRole("img");
    expect(img).toHaveStyle("max-width: 120%");
  });

  it("rotates on rotate button click", () => {
    renderWithLang(<ImageViewer fileName="photo.png" fileContent="abc" fileEncoding="base64" />);
    const rotateBtn = screen.getAllByRole("button")[2];
    fireEvent.click(rotateBtn);
    const img = screen.getByRole("img");
    expect(img).toHaveStyle("transform: rotate(90deg)");
  });
});
