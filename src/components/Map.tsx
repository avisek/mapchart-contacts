import { useQuery } from '@tanstack/react-query'
import { getCountrySpecificData } from '../utils/dataService'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface CountryInfo {
  _id: number
  lat: number
  long: number
}

interface CountryData {
  country: string
  active: number
  deaths: number
  recovered: number
  countryInfo: CountryInfo
}

type CountrySpecificData = CountryData[]

function Map() {
  const countrySpecificDataQuery = useQuery({
    queryKey: ['COUNTRY_SPECIFIC'],
    queryFn: getCountrySpecificData,
  })
  
  if (countrySpecificDataQuery.isError) {
    return <div>Error fetching data.</div>
  }
  
  if (countrySpecificDataQuery.isLoading) {
    return (
      <div className='flex justify-center w-full h-32'>
        <span className="loading loading-dots loading-md"></span>
      </div>
    )
  }
  
  const data: CountrySpecificData = countrySpecificDataQuery.data.data

  return (
    <div className='bg-base-200 p-2 rounded-lg w-full h-[32rem] grid-in-map'>
      <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          Array.from(data).map(countryData => {
            const {country, active, deaths, recovered, countryInfo} = countryData
            const { _id: id, lat, long } = countryInfo
            const position: LatLngTuple = [lat, long]
            return (
              <Marker key={country} position={position}>
                <Popup>
                  <div className='text-lg'>{country}</div>
                  <div>Active: {active}</div>
                  <div>Recovered: {recovered}</div>
                  <div>Deaths: {deaths}</div>
                </Popup>
              </Marker>
            )
          })
        }
      </MapContainer>
    </div>
  )
}

export default Map
