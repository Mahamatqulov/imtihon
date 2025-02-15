import React from "react";
import InvoiceDashboard from "../components/InvoiceDashboard";
import Sidebar from "../components/sidebar";

function Home() {
  return (
    <div className="lg:flex h-full flex items-center">
      <Sidebar />
      <InvoiceDashboard />
    </div>
  );
}

export default Home;
