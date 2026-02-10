// app/api/generate/route.js
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge'; // Important pour la vitesse

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // On récupère les infos passées dans l'URL
    const title = searchParams.get('title') || 'Produit Incroyable';
    const price = searchParams.get('price') || '';
    const image = searchParams.get('image');

    return new ImageResponse(
      (
        // C'est ici qu'on dessine l'image en HTML/CSS !
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Fond décoratif */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '20px',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          }} />

          {/* Image du produit */}
          {image && (
            <img
              src={image}
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'contain',
                marginBottom: '20px',
                borderRadius: '15px',
              }}
            />
          )}

          {/* Titre */}
          <div style={{ 
            fontSize: 40, 
            fontWeight: 'bold', 
            textAlign: 'center',
            padding: '0 40px',
            color: '#1e293b'
          }}>
            {title}
          </div>

          {/* Prix (Badge) */}
          {price && (
            <div style={{
              marginTop: '20px',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '10px 30px',
              borderRadius: '50px',
              fontSize: 30,
              fontWeight: 'bold',
            }}>
              {price}
            </div>
          )}

          {/* Footer promo */}
          <div style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 18,
            color: '#64748b',
          }}>
            Dispo maintenant sur le shop !
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1080, // Format carré Instagram
      },
    );
  } catch (e) {
    return new Response(`Erreur: ${e.message}`, { status: 500 });
  }
}