import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { FavoritesProvider } from "@/app/context/FavoritesContext";
import  Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head >
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />

        </head>
        <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
          <ThemeProvider>
            <FavoritesProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-6">
                  {children}
                </main>
                <Footer />
              </div>
            </FavoritesProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
