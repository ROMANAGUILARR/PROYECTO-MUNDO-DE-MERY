import "@/styles/globals.css";
import Navbar from "@/components/shared/navbar-public";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}