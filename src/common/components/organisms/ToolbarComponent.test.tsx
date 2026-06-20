import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ToolbarComponent } from "./ToolbarComponent";

vi.mock("../../localization/LanguageContext", () => ({
  useLanguage: () => ({
    literal: { "nav.open_drawer": "Open drawer" },
  }),
}));

vi.mock("../../theme/ThemeToggle", () => ({
  ThemeToggle: () => <button>Toggle Theme</button>,
}));

const themeContext = {
  darkMode: false,
  toggleDarkMode: vi.fn(),
};

describe("ToolbarComponent", () => {
  it("renders the title", () => {
    render(
      <ToolbarComponent
        title="My App"
        handleDrawerToggle={vi.fn()}
        themeContext={themeContext}
      />
    );
    expect(screen.getByText("My App")).toBeTruthy();
  });

  it("renders menu icon button with aria-label", () => {
    render(
      <ToolbarComponent
        title="App"
        handleDrawerToggle={vi.fn()}
        themeContext={themeContext}
      />
    );
    expect(screen.getByLabelText("Open drawer")).toBeTruthy();
  });

  it("calls handleDrawerToggle when menu button clicked", async () => {
    const handleDrawerToggle = vi.fn();
    render(
      <ToolbarComponent
        title="App"
        handleDrawerToggle={handleDrawerToggle}
        themeContext={themeContext}
      />
    );
    await userEvent.click(screen.getByLabelText("Open drawer"));
    expect(handleDrawerToggle).toHaveBeenCalledOnce();
  });
});
