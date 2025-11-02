"use client";
import { useState } from "react";
import "@/styles/globals.scss";
import '@/styles/datapicker.scss';
import "@/styles/layout.scss";
import { ToggleMenu } from '@/components/ui/toggleMenu/toggleMenu';
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { HeaderContext } from "@/hooks/useHeaderContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => setIsMenuOpen(prev => !prev);
  return (
     
    <html lang="en">
      <HeaderContext.Provider value={{ isMenuOpen, toggleMenu }}>
      <body className="layout-wrapper">  
          <div className="layout-content">
            <Header />
            <main className="layout-main">{children}
              {isMenuOpen && <ToggleMenu />}

            </main>
            <Footer />
            
          </div>
      </body>
      </HeaderContext.Provider>
    </html>
       
  );
}
