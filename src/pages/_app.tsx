import { ModeToggle } from "@/components/theme-button";
import { ThemeProvider } from "@/context/themecontext";
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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className={`${playfair.variable} ${openSans.className} relative`}>
        <div className="absolute top-4 right-2.5 justify-end text-black z-10">
          <ModeToggle />
        </div>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
