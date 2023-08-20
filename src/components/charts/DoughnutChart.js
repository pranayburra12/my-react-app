import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
// import { options } from 'pg/lib/defaults'

export default function DoughnutChart({chartData,textCenter}) {
    
  return (
   <Doughnut data={chartData} plugins={[textCenter]} options={{cutout:'50%'}}/>
  )
}
