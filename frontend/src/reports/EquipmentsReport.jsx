import React from 'react'
import {Page, Text, Document, StyleSheet } from "@react-pdf/renderer"
import PdfTable from '../components/PdfTable/PdfTable'

const styles = StyleSheet.create({
    page: { padding: 30 },
    title: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
})

const EquipmentsReport = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Relatório de Clientes</Text>
        <PdfTable
            columns={[
                {key: 'ID', title: 'ID'},
                {key: 'Nome', title: 'Nome'},
                {key: 'IP', title: 'IP'},
                {key: 'MAC', title: 'MAC'},
                {key: 'Status', title: 'Status'},

            ]}
            data={data}
        />
    </Page>
  </Document>
)

export default EquipmentsReport