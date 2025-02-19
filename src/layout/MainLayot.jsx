import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="lg:flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
