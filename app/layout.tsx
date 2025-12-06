// Root layout component for the New Year's Trip website
// Provides global HTML structure, metadata, and styling
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Year's Trip",
  description: "Plan your New Year's Trip with timetables, rooms, activities, and shopping lists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
