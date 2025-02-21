import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import RQueryClientProvider from "@/providers/RQueryClientProvider";

const poppins = Poppins({
  weight: ["100", "200", "500", "600", "400", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s - CETA",
    default: "CETA",
  },
  description:
    "CETA enables businesses to manage and resolve customer issues efficiently.",
  keywords: [
    "ticketing",
    "support",
    "help desk",
    "customer service",
    "customer support",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster />
        <RQueryClientProvider>{children}</RQueryClientProvider>
      </body>
    </html>
  );
}
