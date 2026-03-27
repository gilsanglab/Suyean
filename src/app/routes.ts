import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { BrandSystem } from "./pages/BrandSystem";
import { SocialTemplates } from "./pages/SocialTemplates";
import { Production } from "./pages/Production";
import { Generator } from "./pages/Generator";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: BrandSystem },
      { path: "templates", Component: SocialTemplates },
      { path: "production", Component: Production },
      { path: "generator", Component: Generator },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});