import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const hypertensionData = [
    { name: 'Jan', systolic: 120, diastolic: 80 },
    { name: 'Feb', systolic: 130, diastolic: 85 },
    { name: 'Mar', systolic: 125, diastolic: 82 },
    { name: 'Apr', systolic: 135, diastolic: 90 },
    { name: 'May', systolic: 140, diastolic: 92 },
    { name: 'Jun', systolic: 145, diastolic: 94 },
    { name: 'Jul', systolic: 150, diastolic: 96 },
    { name: 'Aug', systolic: 155, diastolic: 98 },
    { name: 'Sep', systolic: 160, diastolic: 100 },
    { name: 'Oct', systolic: 165, diastolic: 102 },
    { name: 'Nov', systolic: 170, diastolic: 105 },
    { name: 'Dec', systolic: 175, diastolic: 107 },
];

const HypertensionBarChart = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Hypertension Mensuelle</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={hypertensionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="systolic" fill="#8884d8" name="Systolique" />
                        <Bar dataKey="diastolic" fill="#82ca9d" name="Diastolique" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default HypertensionBarChart;
