import React, { useEffect, useRef, useState } from 'react';
import AdminService from '../../_services/admin.service';
import PieChartFilesByUser from '../../components/statistics/PieChartFilesByUser';

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

            <div>
                Il y a {statistics.statistics.countFiles} fichiers sur nos serveurs.
            </div>

            <div>
                Il y a {statistics.statistics.countUsers} utilisateurs inscrits.
            </div>

            <div>
                Il y a {statistics.statistics.nbFilesToday} fichiers uploadés sur nos serveurs aujourd'hui.
            </div>

            <div>
                <PieChartFilesByUser />
            </div>



        </div>
    );
}

export default Statistics;