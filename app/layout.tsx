import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prep Kitchen | Your personal meal-prep cookbook",
  description: "Clear cooking plans, generous protein and lunches worth looking forward to.",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
    shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
