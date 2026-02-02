import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import StructuredData from "@/components/layout/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MediStore - Your Trusted Online Pharmacy",
    template: "%s | MediStore"
  },
  description: "Access trusted medicines and healthcare products with fast delivery, expert advice, and 24/7 support. Your health, our priority.",
  keywords: [
    "online pharmacy",
    "medicines",
    "healthcare",
    "prescription drugs",
    "medical supplies",
    "health products",
    "pharmacy delivery",
    "medical consultation",
    "authentic medicines",
    "healthcare services"
  ],
  authors: [{ name: "MediStore Team" }],
  creator: "MediStore",
  publisher: "MediStore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.FRONTEND_URL || 'http://localhost:3000'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MediStore - Your Trusted Online Pharmacy",
    description: "Access trusted medicines and healthcare products with fast delivery, expert advice, and 24/7 support.",
    url: "/",
    siteName: "MediStore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MediStore - Your Trusted Online Pharmacy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediStore - Your Trusted Online Pharmacy",
    description: "Access trusted medicines and healthcare products with fast delivery and expert advice.",
    images: ["/og-image.png"],
    creator: "@medistore",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2563eb",
      },
    ],
  },
  manifest: "/manifest.json",
  category: "healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >

          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
