import * as React from 'react';
import LineChartComponent from './LineChart';

const glycemiaData = [
    { date: '2024-06-10', glycemia: 100 },
    { date: '2024-06-11', glycemia: 90 },
    { date: '2024-06-12', glycemia: 110 },
    { date: '2024-06-13', glycemia: 112 },
    { date: '2024-06-14', glycemia: 115 },
    { date: '2024-06-15', glycemia: 92 },
    { date: '2024-06-16', glycemia: 92 },
    { date: '2024-06-17', glycemia: 90 },
    { date: '2024-06-18', glycemia: 100 },
    { date: '2024-06-19', glycemia: 99 },
    { date: '2024-06-20', glycemia: 100 },

];

const GlycemiaLineChart = () => {
    return (
        <LineChartComponent
            data={glycemiaData}
            xKey="date"
            yKeys={['glycemia']}
            title="Taux de glycémie"
            description="Taux de glycémie sur les 10 derniers jours"
            colors={['#8884d8']}
        />
    );
};

export default GlycemiaLineChart;