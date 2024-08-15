import Navbar from "./dashboard/_components/Navbar";
import Sidebar from "./dashboard/_components/SIdebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:pl-72">
      <Navbar />

      <Sidebar />

      <div className="min-h-screen p-4 pt-20">{children}</div>
    </div>
  );
}
