import { useQuery } from '@tanstack/react-query'
import { getWorldWideData } from '../utils/dataService'
import DataItem from './DataItem'

interface WorldWideData {
  todayCases: number
  todayDeaths: number
  todayRecovered: number
  cases: number
  deaths: number
  recovered: number
}

function WorldWideData() {
  const worldWideDataQuery = useQuery({
    queryKey: ['WORLD_WIDE'],
    queryFn: getWorldWideData,
  })

  if (worldWideDataQuery.isError) {
    return <div>Error fetching data.</div>
  }

  if (worldWideDataQuery.isLoading) {
    return (
      <div className="flex justify-center h-32">
        <span className="loading loading-dots loading-md"></span>
      </div>
    )
  }

  const data: WorldWideData = worldWideDataQuery.data.data

  return (
    <div className="grid-in-global grid grid-cols-2 md:grid-cols-3 gap-3">
      <DataItem label="Today Cases" value={data.todayCases} />
      <DataItem label="Today Deaths" value={data.todayDeaths} />
      <DataItem label="Today Recovered" value={data.todayRecovered} />
      <DataItem label="Total Cases" value={data.cases} />
      <DataItem label="Total Deaths" value={data.deaths} />
      <DataItem label="Total Recovered" value={data.recovered} />
    </div>
  )
}

export default WorldWideData
