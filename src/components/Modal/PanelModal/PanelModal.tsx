import React from 'react'
import styles from './PanelModal.module.scss'

interface PanelModalProps {
    icon: React.ReactNode;
    text: string
    value: string | number
}

const PanelModal: React.FC<PanelModalProps> = ({text, icon, value}) => {
    return (
        <div className={styles.panelModal}>
            {icon}
            <div className={styles.wrapperTitle}>
                <h6>{text}</h6>
                <p>{value}</p>
            </div>
        </div>

    )
}

export default PanelModal