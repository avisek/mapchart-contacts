import { useQuery } from '@tanstack/react-query'
import { getHistoricalData } from '../utils/dataService'
import { Chart, AxisOptions } from 'react-charts';
import { useMemo } from 'react';

interface GraphData {
  [date: string]: number;
}

interface HistoricalData {
  cases: GraphData
  deaths: GraphData
  recovered: GraphData
}

function Graph({ data, color }: any) {
  
  const primaryAxis = useMemo(
    (): AxisOptions<any> => ({
      getValue: datum => datum.date,
    }),
    []
  )

  const secondaryAxes = useMemo(
    (): AxisOptions<any>[] => [
      {
        getValue: datum => datum.cases,
      },
    ],
    []
  )
  
  return (
    <div className='bg-base-200 p-0 rounded-lg w-full overflow-hidden'>
      <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        defaultColors: [color]
      }}
    />
    </div>
  )
}

export default Graph
