import React, { useEffect, useRef, useState } from 'react';
import AdminService from '../../_services/admin.service';
import PieChartFilesByUser from '../../components/statistics/PieChartFilesByUser';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Statistics = () => {
    const flag = useRef(false);
    const [statistics, setStatistics] = useState([]);

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
                <Paper>{statistics.statistics?.countFiles} fichiers</Paper>
                <Paper>{statistics.statistics?.countUsers} utilisateurs</Paper>
                <Paper>{statistics.statistics?.nbFilesToday} fichiers uploadés aujourd'hui</Paper>
            </Box>

            <PieChartFilesByUser data={statistics.filesByUser} />

        </div>
    );
}

export default Statistics;