import React from "react";
import InvoiceDashboard from "./components/InvoiceDashboard";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Sidebar />
        <InvoiceDashboard />
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
  return <RouterProvider router={router} />;
}

export default App;
