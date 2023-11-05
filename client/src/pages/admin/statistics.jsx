import React, { useEffect, useRef, useState } from 'react';
import AdminService from '../../_services/admin.service';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { PieChart, Pie, Cell } from "recharts";

const Statistics = () => {
    const flag = useRef(false);
    const [statistics, setStatistics] = useState([]);
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    useEffect(() => {
        if(flag.current === false){
            AdminService.getStatistics()
                .then(res => {
                    console.log(res.data);
                    setStatistics(res.data);
                })
        }
        return () => flag.current = true;
    }, []);

    return (
        <div>
            Statistics
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: 128,
                    height: 128,
                    },
                }}
                >
                <Paper>{statistics.countFiles} fichiers</Paper>
                <Paper>{statistics.countUsers} utilisateurs</Paper>
                <Paper>{statistics.nbFilesToday} fichiers uploadés aujourd'hui</Paper>
            </Box>

            <PieChart width={400} height={400}>
                <Pie
                    data={statistics.filesByUser}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                >
                    {statistics.filesByUser.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
}

export default Statistics;