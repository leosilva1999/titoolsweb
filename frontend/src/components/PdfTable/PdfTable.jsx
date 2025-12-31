import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    table: {
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCol: {
      width: '25%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      marginVertical: 5,
      marginHorizontal: 2,
      fontSize: 10,
    },
    header: {
      backgroundColor: '#f0f0f0',
      fontWeight: 'bold',
    },
  });

const PdfTable = ({columns, data}) => {
    const cellWidth = `${100 / columns.length}%`;

  return (
    <View style={styles.table}>
        {/**Cabeçalho */}
        <View style={[styles.header, styles.tableRow]} fixed>
            {columns.map((col) => (
                <View style={[styles.tableCol, {width: cellWidth}]} key={col.key}>
                    <Text style={styles.tableCell}>{col.title}</Text>
                </View>
            ))}
        </View>

        {/**Dados */}
        {data.map((row, rowIndex) => (
            <View style={styles.tableRow} wrap={false} key={rowIndex}>
                {columns.map((col)=>(
                    <View style={[styles.tableCol, {width: cellWidth}]} key={col.key}>
                        <Text style={styles.tableCell}>{row[col.key]}</Text>
                    </View>
                ))}
            </View>
        ))}
    </View>
  )
}

export default PdfTable