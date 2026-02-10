// app/facture/page.js
"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import InvoicePDF from './../components/InvoicePDF'; // On importe notre modèle

// Import dynamique pour éviter les erreurs "window not found" avec React-PDF
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <p>Chargement du moteur PDF...</p> }
);

export default function FacturePage() {
  // État pour stocker les infos de la facture
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-2024-001',
    clientName: '',
    clientEmail: '',
    items: [{ description: 'Création Site Web', quantity: 1, price: 500 }],
    total: 500
  });

  // Calcul automatique du total quand les items changent
  useEffect(() => {
    const total = invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    setInvoiceData(prev => ({ ...prev, total }));
  }, [invoiceData.items]);

  // Ajouter une ligne produit
  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: 'Nouveau service', quantity: 1, price: 0 }]
    });
  };

  // Mettre à jour une ligne
  const updateItem = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      
      {/* Navigation retour */}
      <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 mb-8">
        <ArrowLeft size={16} className="mr-2" /> Retour à l'accueil
      </Link>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* COLONNE GAUCHE : Formulaire */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold mb-6">Éditeur de Facture</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
              <input 
                type="text" 
                placeholder="Nom du client"
                className="w-full p-2 border rounded-md"
                value={invoiceData.clientName}
                onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
              />
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Services / Produits</label>
              {invoiceData.items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    className="flex-1 p-2 border rounded-md text-sm"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                  />
                  <input 
                    type="number" 
                    className="w-16 p-2 border rounded-md text-sm"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                  />
                  <input 
                    type="number" 
                    className="w-20 p-2 border rounded-md text-sm"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                  />
                </div>
              ))}
              <button onClick={addItem} className="text-blue-600 text-sm flex items-center mt-2 hover:underline">
                <Plus size={14} className="mr-1"/> Ajouter une ligne
              </button>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : Action & Résumé */}
        <div className="flex flex-col gap-6">
          
          {/* Carte Résumé */}
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-medium opacity-80">Total Facture</h2>
            <div className="text-4xl font-bold mt-2">{invoiceData.total} $</div>
          </div>

          {/* Bouton de téléchargement PDF */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
            <p className="text-slate-500 mb-4">Votre facture est prête à être générée.</p>
            
            <PDFDownloadLink 
              document={<InvoicePDF data={invoiceData} />} 
              fileName={`facture-${invoiceData.invoiceNumber}.pdf`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Génération du PDF...' : 'Télécharger la Facture PDF'
              }
            </PDFDownloadLink>
          </div>

        </div>
      </div>
    </div>
  );
}