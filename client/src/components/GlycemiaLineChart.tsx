import React, { useState, useEffect } from 'react';
import LineChartComponent from './LineChart';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

const GlycemiaLineChart = () => {
    const [glycemiaData, setGlycemiaData] = useState([]);
    const { auth } = useAuth();

    const fetchGlycemiaData = async () => {
        try {
            const response = await axios.get(`${(import.meta as any).env.VITE_SERVER_URL}/disease/${auth.userId}/diabete`,{
                headers: { Authorization: `Bearer ${auth.accessToken}`,
                "Content-Type": "application/json"},
            });

            const data = response.data.map(item => {
                const date = new Date(item.date);
                const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                return {
                    ...item,
                    date: dateString,
                };
            });

            setGlycemiaData(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchGlycemiaData();
    }, []);

    return (
        <LineChartComponent
            data={glycemiaData}
            xKey={'date'}
            yKeys={['glycemie']}
            title="Taux de glycémie"
            description="Taux de glycémie sur les 10 derniers jours"
            colors={['#8884d8']}
        />
    );
};

export default GlycemiaLineChart;