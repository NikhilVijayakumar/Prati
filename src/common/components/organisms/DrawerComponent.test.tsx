import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DrawerComponent } from "./DrawerComponent";
import type { Features } from "./drawerData";
import type { UiFeature } from "./drawerData";
import HomeIcon from "@mui/icons-material/Home";

vi.mock("../../localization/LanguageContext", () => ({
  useLanguage: () => ({
    literal: { "nav.drawer_label": "Navigation" },
  }),
}));

const features: Features[] = [
  { id: 1, name: "dashboard", display_order: 1, icon: HomeIcon },
];

const uiFeatureList: Record<string, UiFeature> = {
  dashboard: { url: "/dashboard" },
};

describe("DrawerComponent", () => {
  it("renders nav with aria-label", () => {
    render(
      <DrawerComponent
        sortedFeatures={features}
        UiFeatureList={uiFeatureList}
        container={undefined}
        onMenuItemClick={vi.fn()}
        mobileOpen={false}
        handleDrawerToggle={vi.fn()}
      />
    );
    expect(screen.getByRole("navigation", { name: "Navigation" })).toBeTruthy();
  });

  it("renders feature items", () => {
    render(
      <DrawerComponent
        sortedFeatures={features}
        UiFeatureList={uiFeatureList}
        container={undefined}
        onMenuItemClick={vi.fn()}
        mobileOpen={false}
        handleDrawerToggle={vi.fn()}
      />
    );
    expect(screen.getAllByText("dashboard").length).toBeGreaterThan(0);
  });

  it("renders empty list when sortedFeatures is null", () => {
    render(
      <DrawerComponent
        sortedFeatures={null}
        UiFeatureList={{}}
        container={undefined}
        onMenuItemClick={vi.fn()}
        mobileOpen={false}
        handleDrawerToggle={vi.fn()}
      />
    );
    expect(screen.getByRole("navigation")).toBeTruthy();
  });
});
