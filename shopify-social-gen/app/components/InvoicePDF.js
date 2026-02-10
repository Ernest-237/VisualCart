// components/InvoicePDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Styles du PDF (similaire au CSS mais spécifique pour le PDF)
const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#fff', padding: 40 },
  header: { marginBottom: 20, borderBottom: '1px solid #eee', paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111' },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  label: { fontSize: 10, color: '#666' },
  value: { fontSize: 12, color: '#000' },
  tableHeader: { flexDirection: 'row', borderBottom: '1px solid #000', paddingBottom: 5, marginTop: 20 },
  tableRow: { flexDirection: 'row', borderBottom: '1px solid #eee', paddingTop: 5, paddingBottom: 5 },
  colDesignation: { width: '60%', fontSize: 10 },
  colQty: { width: '15%', fontSize: 10, textAlign: 'right' },
  colPrice: { width: '25%', fontSize: 10, textAlign: 'right' },
  total: { marginTop: 30, textAlign: 'right', fontSize: 14, fontWeight: 'bold' }
});

// Le composant qui reçoit les données (data)
const InvoicePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.title}>FACTURE</Text>
        <Text style={{ fontSize: 10, color: '#888' }}>#{data.invoiceNumber}</Text>
      </View>

      {/* Infos Client & Vendeur */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
        <View>
          <Text style={styles.label}>De :</Text>
          <Text style={styles.value}>Votre Entreprise SaaS</Text>
          <Text style={styles.value}>contact@mon-saas.com</Text>
        </View>
        <View>
          <Text style={styles.label}>Facturé à :</Text>
          <Text style={styles.value}>{data.clientName || 'Nom du client'}</Text>
          <Text style={styles.value}>{data.clientEmail || 'email@client.com'}</Text>
        </View>
      </View>

      {/* Tableau des produits */}
      <View style={styles.tableHeader}>
        <Text style={styles.colDesignation}>Désignation</Text>
        <Text style={styles.colQty}>Qté</Text>
        <Text style={styles.colPrice}>Prix</Text>
      </View>

      {data.items.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.colDesignation}>{item.description}</Text>
          <Text style={styles.colQty}>{item.quantity}</Text>
          <Text style={styles.colPrice}>{item.price} $</Text>
        </View>
      ))}

      {/* Total */}
      <View style={styles.total}>
        <Text>Total à payer: {data.total} $</Text>
      </View>

      {/* Footer */}
      <View style={{ position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center' }}>
        <Text style={{ fontSize: 10, color: '#999' }}>Merci pour votre confiance.</Text>
      </View>

    </Page>
  </Document>
);

export default InvoicePDF;