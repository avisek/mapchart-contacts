import { useQuery } from '@tanstack/react-query'
import { getCountrySpecificData } from '../utils/dataService'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'
import { Icon, LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface CountryInfo {
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

const pointerIcon = new Icon({
  iconUrl: 'images/marker-icon.png',
  shadowUrl: 'images/marker-shadow.png',
  iconSize: [20, 31],
  shadowSize: [38, 31],
  iconAnchor: [10, 31],
  shadowAnchor: [10, 31],
  popupAnchor: [0, -18],
})

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
      <div className="flex justify-center w-full h-32">
        <span className="loading loading-dots loading-md"></span>
      </div>
    )
  }
  
  const data: CountrySpecificData = countrySpecificDataQuery.data.data
  
  return (
    <MapContainer
      className="grid-in-map w-full h-[32rem] bg-base-200 rounded-lg"
      center={[28.3, 46.23]}
      zoom={1.8}
      minZoom={1}
      scrollWheelZoom={true}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {Array.from(data).map((countryData) => {
        const { country, active, deaths, recovered, countryInfo } = countryData
        const { lat, long } = countryInfo
        const position: LatLngTuple = [lat, long]
        return (
          <Marker key={country} position={position} icon={pointerIcon}>
            <Popup maxWidth={160}>
              <div className="text-xl mb-1">{country}</div>
              <div className="grid grid-cols-[auto_1fr]">
                <div className="text-end mr-1 opacity-70">Active</div>
                <div className="text-error font-semibold">{active.toLocaleString()}</div>
                <div className="text-end mr-1 opacity-70">Recovered</div>
                <div className="text-accent-focus font-semibold">{recovered.toLocaleString()}</div>
                <div className="text-end mr-1 opacity-70">Deaths</div>
                <div className="text-base-content font-semibold">{deaths.toLocaleString()}</div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export default Map
