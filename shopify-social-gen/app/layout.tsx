// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // <-- 1. On importe la Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mon Micro SaaS Shopify",
  description: "Outils pour e-commerçants",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* 2. On l'affiche ici, au-dessus de tout le reste */}
        <Navbar /> 
        
        {/* "children" représente la page actuelle (Accueil ou Facture) */}
        {children}
      </body>
    </html>
  );
}