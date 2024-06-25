import * as React from 'react';
import AlertCard from './AlertCard';

const hypertensionAlerts = [
    { type: 'Hypertension', message: 'Elevé', date: '2024-06-10' },
    { type: 'Hypertension', message: 'Elevé', date: '2024-06-10' },
    { type: 'Hypertension', message: 'Elevé', date: '2024-06-10' },
    { type: 'Hypertension', message: 'Elevé', date: '2024-06-10' },
    { type: 'Hypertension', message: 'Elevé', date: '2024-06-10' },
 ];

const DiabeteAlertCard = () => {
    return (
        <AlertCard title="Vos alertes récemment" alerts={hypertensionAlerts} />
    );
}

export default DiabeteAlertCard;