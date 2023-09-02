import WorldWideData from '../components/WorldWideData'
import Map from '../components/Map'
import Charts from '../components/Charts'

function ChartsMaps() {
  return (
    <>
      <h2>Charts & Maps</h2>
      <div className="
        grid mt-3 gap-3
        grid-areas-dashboardSm grid-cols-dashboardSm grid-rows-dashboardSm
        md:grid-areas-dashboard md:grid-cols-dashboard md:grid-rows-dashboard
        xl:grid-areas-dashboardLg xl:grid-cols-dashboardLg xl:grid-rows-dashboardLg
      ">
        <WorldWideData />
        <Map />
        <Charts />
      </div>
    </>
  )
}

export default ChartsMaps
