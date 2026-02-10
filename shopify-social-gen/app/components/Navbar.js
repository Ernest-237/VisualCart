// components/Navbar.js
import Link from 'next/link';
import { Image, FileText, LayoutGrid } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo / Nom du SaaS */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 hover:opacity-80 transition">
          <div className="bg-blue-600 text-white p-1 rounded-md">
            <LayoutGrid size={20} />
          </div>
          <span>MicroSaaS.</span>
        </Link>

        {/* Les Liens de Navigation */}
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            <Image size={18} />
            Social Gen
          </Link>
          
          <Link 
            href="/facture" 
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            <FileText size={18} />
            Facture
          </Link>
        </div>

        {/* Bouton Connexion (factice pour l'instant) */}
        <button className="text-sm bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition">
          Mon Compte
        </button>

      </div>
    </nav>
  );
}