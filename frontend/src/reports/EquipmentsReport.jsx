import React from 'react'
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer"
import PdfTable from '../components/PdfTable/PdfTable'

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
})

const EquipmentsReport = ({ data }) => (
  <Document>
    <Page size="A4" orientation='landscape' style={styles.page}>
      <Text style={styles.title}>Relatório de Equipamentos</Text>
      <PdfTable
        columns={[
          { key: 'ID', title: 'ID' },
          { key: 'Nome', title: 'Nome' },
          { key: 'IP', title: 'IP' },
          { key: 'MAC', title: 'MAC' },
          { key: 'Tipo', title: 'Tipo' },
          { key: 'Fabricante', title: 'Fabricante' },
          { key: 'Modelo', title: 'Modelo' },
          { key: 'Status', title: 'Status' },

        ]}
        data={data}
      />
    </Page>
  </Document>
)

export default EquipmentsReport