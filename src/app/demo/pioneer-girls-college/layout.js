import { DM_Sans, Playfair_Display } from "next/font/google";
import "./pioneer-college.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pioneer-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pioneer-serif",
});

export const metadata = {
  title: "Pioneer Girls College — Website Demo",
  description: "Pioneer Girls College website design demo by Effy Tech",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PioneerGirlsCollegeLayout({ children }) {
  return (
    <div className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      {children}
    </div>
  );
}
