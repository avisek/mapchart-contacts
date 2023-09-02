import { Chart, AxisOptions } from 'react-charts';
import { useMemo } from 'react';

function Graph({ data, color }: any) {
  
  const primaryAxis = useMemo(
    (): AxisOptions<any> => ({
      getValue: datum => datum.date,
    }),
    []
  )
  
  const secondaryAxes = useMemo(
    (): AxisOptions<any>[] => [{
      getValue: datum => datum.cases,
    }],
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
