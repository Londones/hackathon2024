import React, { useState, useEffect } from 'react';
import AlertCard from './AlertCard';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

const DiabeteAlertCard = () => {
    const [hypertensionAlerts, setHypertensionAlerts] = useState([])
    const { auth } = useAuth();

    const fetchDiabeteAlerts = async () => {
        try {
            const response = await axios.get(`${(import.meta as any).env.VITE_SERVER_URL}/alert/${auth.userId}/Hypertension`, {
                headers: { Authorization: `Bearer ${auth.accessToken}`,
                "Content-Type": "application/json" },
            });

            const data = response.data.map(item => {
                const date = new Date(item.date);
                const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                return {
                    ...item,
                    date: dateString,
                };
            });

            setHypertensionAlerts(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDiabeteAlerts();
    }, []);

    return (
        <AlertCard title="Vos alertes récemment" alerts={hypertensionAlerts} />
    );
}

export default DiabeteAlertCard;