"use client";
import Navbar from "@/components/dashboard-ui/navbar";
import Footer from "@/components/dashboard-ui/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </section>
  );
}
