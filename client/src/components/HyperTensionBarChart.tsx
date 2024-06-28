import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

const HypertensionBarChart = () => {
    const [hypertensionData, setHypertensionData] = useState([]);
    const { auth } = useAuth();

    const fetchHypertensionData = async () => {
        try {
            const response = await axios.get(`${(import.meta as any).env.VITE_SERVER_URL}/disease/${auth.userId}/Hypertension`, {
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

            setHypertensionData(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchHypertensionData();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hypertension</CardTitle>
                <CardDescription>Tendance de la tension artérielle de cette année</CardDescription>
            </CardHeader>
            
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={hypertensionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={'date'} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={'systolic'} fill="#8884d8" name="Systolique" />
                        <Bar dataKey={'diastolic'} fill="#82ca9d" name="Diastolique" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default HypertensionBarChart;
