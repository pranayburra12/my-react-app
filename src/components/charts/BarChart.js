import React from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
// import { options } from 'pg/lib/defaults'

export default function BarChart({chartData}) {
    
  return (
   <Bar data={chartData}  options={{cutout:'50%'}}/>
  )
}
