import Sidebar from "../components/sidebar";

export default function Layout({ children }) {
  return (
    <div className="lg:flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
