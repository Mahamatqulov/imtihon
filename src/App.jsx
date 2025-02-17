import React from "react";
import MainLayot from "./layout/MainLayot";

import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MainLayot>
          <Home />
        </MainLayot>
      </ThemeProvider>
    ),
  },
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/about/:id",
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
