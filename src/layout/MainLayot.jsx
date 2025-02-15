import InvoiceDashboard from "../components/InvoiceDashboard";
import Sidebar from "../components/sidebar";
import "./index.css";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="lg:flex">
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <InvoiceDashboard />
    </div>
  );
}
