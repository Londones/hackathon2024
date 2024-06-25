
import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const LineChartComponent = ({ data, xKey, yKeys, title, description, colors }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {yKeys.map((key, index) => (
                            <Line key={key} type="monotone" dataKey={key} stroke={colors[index]} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default LineChartComponent;
