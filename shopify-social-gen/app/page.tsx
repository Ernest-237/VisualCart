// app/page.js
"use client";

import { useState } from 'react';
import { Search, Loader2, Download } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedImage(null);

    try {
      // 1. On scrape les infos
      const res = await fetch('/api/scrape', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      
      if(data.error) {
        alert("Erreur: " + data.error);
        setLoading(false);
        return;
      }

      // 2. On construit l'URL de l'image générée
      // On encode les caractères spéciaux pour l'URL
      const params = new URLSearchParams({
        title: data.title.substring(0, 50) + (data.title.length > 50 ? '...' : ''), // On coupe si trop long
        price: data.price,
        image: data.image
      });

      // L'image est générée directement via cette URL
      setGeneratedImage(`/api/generate?${params.toString()}`);

    } catch (err) {
      alert("Erreur lors de l'analyse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-8">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Social Asset Gen</h1>
          <p className="text-slate-600">Générez un visuel Instagram pro depuis une URL.</p>
        </div>

        <form onSubmit={handleAnalyze} className="relative">
          <input
            type="url"
            placeholder="URL Shopify (ex: https://gymshark.com/...)"
            className="w-full p-4 pl-5 pr-12 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search />}
          </button>
        </form>

        {/* Zone de résultat */}
        {generatedImage && (
          <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 animate-in fade-in zoom-in duration-300">
            <h2 className="font-semibold text-center mb-4 text-slate-700">Votre visuel est prêt ! 👇</h2>
            
            {/* L'image générée */}
            <div className="aspect-square w-full bg-slate-100 rounded-lg overflow-hidden border">
                <img 
                    src={generatedImage} 
                    alt="Post Instagram Généré" 
                    className="w-full h-full object-contain"
                />
            </div>

            <a 
              href={generatedImage} 
              download="post-instagram.png"
              className="mt-4 flex items-center justify-center gap-2 w-full bg-slate-900 text-white p-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Download size={18} /> Télécharger l'image
            </a>
          </div>
        )}

      </div>
    </main>
  );
}