import Charts from "../components/Charts"
import Map from "../components/Map"
import WorldWideData from "../components/WorldWideData"

function ChartsMaps() {
  return (
    <>
      <h2>Charts & Maps</h2>
      <div className='grid grid-areas-dashboardSm grid-cols-dashboardSm grid-rows-dashboardSm md:grid-areas-dashboard md:grid-cols-dashboard md:grid-rows-dashboard xl:grid-areas-dashboardLg xl:grid-cols-dashboardLg xl:grid-rows-dashboardLg mt-3 gap-3'>
        <WorldWideData />
        <Map />
        <Charts />
      </div>
    </>
  )
}

export default ChartsMaps
