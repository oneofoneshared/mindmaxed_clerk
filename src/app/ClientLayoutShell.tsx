"use client";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLElement>(null);
  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="main-content"
      >
        {children}
      </main>
    </>
  );
}
