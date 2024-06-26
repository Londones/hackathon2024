import * as React from 'react';
import AlertCard from './AlertCard';

const diabeteAlerts = [
    { type: 'Diabete', message: 'Elevé', date: '2024-06-10' },
    { type: 'Diabete', message: 'Elevé', date: '2024-06-10' },
    { type: 'Diabete', message: 'Elevé', date: '2024-06-10' },
    { type: 'Diabete', message: 'Elevé', date: '2024-06-10' },
    { type: 'Diabete', message: 'Elevé', date: '2024-06-10' },
 ];

const DiabeteAlertCard = () => {
    return (
        <AlertCard title="Vos alertes récemment" alerts={diabeteAlerts} />
    );
}

export default DiabeteAlertCard;