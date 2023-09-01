import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
// import { options } from 'pg/lib/defaults'

export default function DoughnutChart({chartData,textCenter,options}) {
    
  return (
    <div className="p-2 rounded-lg">
   <Doughnut data={chartData} plugins={[textCenter]} options={options}/>
   </div>
  )
}
