import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Local Living & Service Hub",
  description: "Find a home. Find trusted services. Manage your living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

