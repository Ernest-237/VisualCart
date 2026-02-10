// app/api/scrape/route.js
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request) {
  // J'ai retiré ": Request" ici, c'est ça qui bloquait
  try {
    const body = await request.json();
    const url = body.url;

    if (!url) {
      return NextResponse.json({ error: 'URL manquante' }, { status: 400 });
    }

    // 1. Récupérer le HTML de la page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Impossible de charger la page' }, { status: 500 });
    }

    const html = await response.text();

    // 2. Charger le HTML dans Cheerio
    const $ = cheerio.load(html);

    // 3. Extraire les données
    const title = $('meta[property="og:title"]').attr('content') || $('title').text();
    const image = $('meta[property="og:image"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content');
    
    // Essayer de trouver le prix
    let price = $('meta[property="product:price:amount"]').attr('content');
    const currency = $('meta[property="product:price:currency"]').attr('content') || '€';

    // Nettoyage de l'image
    const cleanImage = image ? image.split('?')[0] : null;

    return NextResponse.json({
      title,
      description,
      image: cleanImage,
      price: price ? `${price} ${currency}` : 'Prix non trouvé'
    });

  } catch (error) {
    console.error(error); // Utile pour voir l'erreur dans votre terminal
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}