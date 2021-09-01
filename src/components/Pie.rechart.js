// src/components/pie.rechart.js

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#274735', '#e20029', '#001489', '#ffcc00', '#0d1a28', '#7f7f7f'];
const ServicesPieChart = ({ pieData }) => {
    const GetSystemCounts = (serviceId) => {
        return null;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value} Systems`}</label>
                </div>
            );
        }

        return null;
    };

    return (
        <PieChart width={250} height={250}>
            <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                {
                    pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
            <Tooltip content={<CustomTooltip />} />
        </PieChart>
    )
}

export default ServicesPieChart;