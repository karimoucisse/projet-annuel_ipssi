import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

const PieChartFilesByUser = (data) => {
  console.log('je suis dans le piechart');
  console.log(data);
  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="lastname"
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  );
}

export default PieChartFilesByUser;