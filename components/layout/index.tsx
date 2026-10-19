import type { ReactNode } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "./footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}