import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { DM_Sans } from 'next/font/google';

import Navbar from '@/components/global/NavBar';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: "Olivia Oomen",
  description: "Olivia Oomen's Industrial Design Portfolio",
  openGraph: {
    title: "Olivia Oomen / Portfolio",
    description: "I'm an interdisciplinary creative focused on using design as a tool to shift culture and improve lives",
    url: "https://oliviaoomen.com",
    siteName: "Olivia Oomen / Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Social preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <Navbar />
        {children}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          async
        />
        <Analytics />
      </body>
    </html>
  );
}
