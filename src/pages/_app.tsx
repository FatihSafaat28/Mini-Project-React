import "@/styles/globals.css";
import "@flaticon/flaticon-uicons/css/regular/rounded.css";
import type { AppProps } from "next/app";
import { Open_Sans, Playfair_Display } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${playfair.variable} ${openSans.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
