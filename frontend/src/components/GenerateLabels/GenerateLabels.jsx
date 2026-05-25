import React, { useState, useEffect, useRef } from "react";
import { BlobProvider, Text, StyleSheet, View, Image } from '@react-pdf/renderer';
import styles from "./GenerateLabels.module.css"

import { getEquipments, reset } from "../../slices/equipmentSlice";
import { useSelector, useDispatch } from "react-redux"

import PdfLabels from "../PdfLabels/PdfLabels";
import { generateQrCode } from "../../utils/generateQrCode";

const labelTextStyles = StyleSheet.create({
    name: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    normal: {
        fontSize: 9,
        textAlign: 'center',
    },
    small: {
        fontSize: 8,
        textAlign: 'center',
    },
});

const GenerateLabels = ({ data }) => {
    const { equipments } = useSelector((state) => state.equipment);
    const { user } = useSelector((state) => state.auth) || {}
    const dispatch = useDispatch();

    const [isSkippingLabel, setIsSkippingLabel] = useState(false);
    const [labelsToSkip, setLabelsToSkip] = useState("");

    const isDownloading = useRef(false);
    const [reportState, setReportState] = useState({
        generating: false,
        downloaded: false,
    })

    const [dataToReports, setDataToReports] = useState([]);

    useEffect(() => {
        if (!equipments || equipments.length === 0) return;

        const prepareData = async () => {
            const baseUrl = "http://10.143.129.3:3000/equipment";

            const prepared = await Promise.all(
                equipments.map(async (equip) => {
                    const link = `${baseUrl}/${equip.equipmentId}`;

                    return {
                        ID: equip.equipmentId,
                        Nome: equip.equipmentName,
                        MAC: equip.macAddress,
                        Tipo: equip.type,
                        Fabricante: equip.manufacturer,
                        Modelo: equip.model,
                        qrCode: await generateQrCode(link),
                    };
                })
            );

            setDataToReports(prepared);
        };

        prepareData();
    }, [equipments]);

    const buildLabelsWithSkips = () => {
        const skip = parseInt(labelsToSkip) || 0;

        const emptyLabels = Array.from({length: skip}, () => null)

        return [...emptyLabels, ...dataToReports];
    }

    const handleDownloadPdf = (e) => {
        e.preventDefault();
        setReportState({
            generating: true,
            downloaded: false
        })
        isDownloading.current = false;
    }

    useEffect(() => {
        dispatch(getEquipments({ user, limit: 300, offset: 0, filters: data.filters }));
    }, [])

    return (
        <div>
            <div className={styles.generateLabelsContainer}>
                <div className={styles.brand}>
                    <div className={styles.brandTextTop}><h3>Gerar Etiquetas</h3></div>
                </div>
                <div>
                    <p>Observação: compatível somente <br />com etiquetas ®Colacril CA4356</p>
                </div>
                <form onSubmit={handleDownloadPdf}>
                    <div className={styles.checkBoxContainer}>
                        <input
                            type="checkbox"
                            skippinglabel={isSkippingLabel}
                            onChange={() => setIsSkippingLabel(prev => !prev)}
                        />
                        <p>Pular etiquetas usadas</p>
                    </div>
                    {isSkippingLabel &&
                        <div className={styles.inputBox}>
                            <input
                                type='number'
                                value={labelsToSkip}
                                placeholder='Quantas? Max: 29'
                                onChange={(e) => setLabelsToSkip(e.target.value)}
                                required
                            />
                        </div>
                    }
                    <button type="submit" className={styles.generateLabelBtn}>Gerar</button>
                </form>
            </div>
            {
                reportState.generating && !reportState.downloaded && (<BlobProvider
                    document={<PdfLabels
                        data={buildLabelsWithSkips()}
                        renderLabel={(item) => (
                            item ? (
                                <>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flex: 1, paddingRight: 4 }}>
                                            <Text style={labelTextStyles.small}>ID: {String(item.ID) ?? ''}</Text>
                                            <Text style={labelTextStyles.name}>{String(item.Nome) ?? ''}</Text>
                                            <Text style={labelTextStyles.normal}>{String(item.Tipo) ?? ''}</Text>
                                            <Text style={labelTextStyles.normal}>{String(item.Fabricante) ?? ''} {String(item.Modelo) ?? ''}</Text>
                                            <Text style={labelTextStyles.normal}>{String(item.MAC) ?? ''}</Text>
                                        </View>
                                        {item.qrCode && <Image
                                            src={item.qrCode}
                                            style={{ width: 40, height: 40 }}
                                        />}
                                    </View>
                                </>) : null
                        )}
                    />}
                >
                    {({ blob, loading }) => {
                        if (blob && !loading && !isDownloading.current) {
                            isDownloading.current = true
                            const link = document.createElement("a");
                            link.href = URL.createObjectURL(blob);
                            link.download = 'etiquetas.pdf';
                            link.style.display = 'none';

                            link.onclick = () => {
                                setTimeout(() => {
                                    document.body.removeChild(link);
                                    URL.revokeObjectURL(link.href)
                                    setReportState({
                                        generating: false,
                                        downloaded: true
                                    }, 100);
                                });
                            };

                            document.body.appendChild(link);
                            link.click();
                        }
                        return null
                    }}
                </BlobProvider>
                )}
        </div>
    )
}

export default GenerateLabels