import React, { useState, useEffect } from "react";
import styles from "./GenerateLabels.module.css"

import AsyncSelect, { components } from 'react-select'

const GenerateLabels = () => {
    const [isSkippingTag, setIsSkippingTag] = useState(false);
    const [isPrintingAll, setIsPrintingAll] = useState(true);
    return (
        <div className={styles.generateLabelsContainer}>
            <div className={styles.brand}>
                <div className={styles.brandTextTop}><h3>Gerar Etiquetas</h3></div>
            </div>
            <div>
                <p>Observação: compatível somente <br />com etiquetas ®Colacril CA4356</p>
            </div>
            <form>
                <div className={styles.checkBoxContainer}>
                    <input
                        type="checkbox"
                        skippingTag={isSkippingTag}
                        onChange={() => setIsSkippingTag(prev => !prev)}
                    />
                    <p>Pular etiquetas usadas</p>
                </div>
                {isSkippingTag &&
                    <div className={styles.inputBox}>
                        <input
                            type='number'
                            /*value={nome}*/
                            placeholder='Quantas? Max: 29'
                            hidden={!isSkippingTag}
                            /**onChange={(e) => setNome(e.target.value)}*/
                            required
                        />
                    </div>
                }
                <div className={styles.checkBoxContainer}>
                    <input
                        type="checkbox"
                        skippingTag={isPrintingAll}
                        onChange={() => setIsPrintingAll(prev => !prev)}
                    />
                    <p>Imprimir todos</p>
                </div>
                {isPrintingAll &&
                    <div className={styles.inputBox}>
                        <AsyncSelect
                            isMulti
                            isDisabled={!isPrintingAll}
                            maxMenuHeight={150}
                            menuPlacement="auto"
                        />

                    </div>
                }
                <button type="submit" className={styles.generateLabelBtn}>Gerar</button>
            </form>
        </div>
    )
}

export default GenerateLabels