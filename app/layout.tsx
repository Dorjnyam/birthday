import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "21 x 21 — Төрсөн өдрийн мэнд хүргэе",
  description: "21 хоног танилцсан, 21 нас хүрсэн — шинэ эхлэл.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body className="antialiased">{children}</body>
    </html>
  );
}
