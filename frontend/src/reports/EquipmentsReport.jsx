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
                {key: 'equipmentId', title: 'ID'},
                {key: 'equipmentName', title: 'Nome'},
                {key: 'ipAddress', title: 'IP'},
                {key: 'macAddress', title: 'MAC'},
                {key: 'equipmentLoanStatus', title: 'Status'},

            ]}
            data={data}
        />
    </Page>
  </Document>
)

export default EquipmentsReport