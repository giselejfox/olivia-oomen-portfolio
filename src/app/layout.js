import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { DM_Sans } from 'next/font/google';

import Navbar from '@/components/global/NavBar';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400','700','800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: "Olivia Oomen",
  description: "Olivia Oomen's Industrial Design Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
