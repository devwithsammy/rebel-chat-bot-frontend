import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@src/contexts/ThemeContext";
import { defaultMeta } from "@src/shared/meta";
import { SidebarProvider } from "@contexts/SidebarContext";
import { AuthProvider } from "@contexts/AuthContext";
import { ModalProvider } from "@src/contexts/ModalContext";

export const metadata: Metadata = {
  ...defaultMeta,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* load google font  */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Gabriela&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Manrope:wght@200..800&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Port+Lligat+Sans&family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik+Puddles&display=swap"
          rel="stylesheet"
        />
        {/* end loading of fonts */}
      </head>
      <body className={`antialiased`}>
        <NextTopLoader color="#808080" height={4} showSpinner={true} />
        <AuthProvider>
          <ThemeProvider>
            <ModalProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
