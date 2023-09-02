import { useQuery } from '@tanstack/react-query'
import { getHistoricalData } from '../utils/dataService'
import { Chart, AxisOptions } from 'react-charts'
import { useMemo } from 'react'
import Graph from './Graph'

interface GraphData {
  [date: string]: number
}

interface HistoricalData {
  cases: GraphData
  deaths: GraphData
  recovered: GraphData
}

function Charts() {
  const countrySpecificDataQuery = useQuery({
    queryKey: ['HISTORICAL'],
    queryFn: getHistoricalData,
  })
  
  if (countrySpecificDataQuery.isError) {
    return <div>Error fetching data.</div>
  }
  
  if (countrySpecificDataQuery.isLoading) {
    return (
      <div className="flex justify-center w-full h-full">
        <span className="loading loading-dots loading-md"></span>
      </div>
    )
  }
  
  const data: HistoricalData = countrySpecificDataQuery.data.data
  
  const transformDate = (str: string) => {
    const [m, d, y] = str.split('/')
    return new Date(parseInt(`20${y}`), parseInt(m) - 1, parseInt(d))
  }
  
  const cases = []
  let i = 7
  for (const key in data.cases) {
    i++ % 7 === 0 &&
      cases.push({ date: transformDate(key), cases: data.cases[key] })
  }
  const deaths = []
  for (const key in data.deaths) {
    i++ % 7 === 0 &&
      deaths.push({ date: transformDate(key), cases: data.deaths[key] })
  }
  const recovered = []
  for (const key in data.recovered) {
    i++ % 7 === 0 &&
      recovered.push({ date: transformDate(key), cases: data.recovered[key] })
  }
  
  const casesData: any = [
    {
      label: 'Cases',
      data: cases,
    },
  ]
  const deathsData: any = [
    {
      label: 'Deaths',
      data: deaths,
    },
  ]
  const recoveredData: any = [
    {
      label: 'Recovered',
      data: recovered,
    },
  ]
  
  return (
    <div className="grid-in-charts w-full h-full min-h-[32rem] grid grid-rows-3 gap-3">
      <Graph data={casesData} color="hsl(var(--er))" />
      <Graph data={deathsData} color="hsl(var(--bc))" />
      <Graph data={recoveredData} color="hsl(var(--su))" />
    </div>
  )
}

export default Charts
