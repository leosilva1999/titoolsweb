import React from 'react';
import { Page, Document, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        paddingTop: '1cm',
        paddingBottom: '1cm',
        paddingHorizontal: '0.4cm',
    },

    labelsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    label: {
        width: '6.5cm',
        height: '2.3cm',
        border: '1px solid #000',
        borderRadius: 6,
        padding: 4,

        /* Espaçamento entre colunas */
        marginRight: '0.1cm',

        /* Sem espaço entre linhas */
        marginBottom: 0,

        justifyContent: 'center',
    },

    /* Remove margem da última coluna */
    labelLastColumn: {
        marginRight: 0,
    },

    labelText: {
        fontSize: 10,
        textAlign: 'center',
    },
});

const PdfLabels = ({ data, renderLabel }) => {
    return (
        <Document>
            <Page size="A4">
                <View style={styles.page}>
                    <View style={styles.labelsContainer}>
                        {data.map((item, index) => {
                            const isLastColumn = (index + 1) % 3 === 0;

                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.label,
                                        isLastColumn && styles.labelLastColumn,
                                    ]}
                                >
                                    {renderLabel ? (
                                        renderLabel(item)
                                    ) : (
                                        <Text style={styles.labelText}>
                                            {item}
                                        </Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PdfLabels;
