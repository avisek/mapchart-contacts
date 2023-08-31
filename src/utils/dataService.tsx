import axios from "axios"

const WORLD_WIDE = 'https://disease.sh/v3/covid-19/all'
const COUNTRY_SPECIFIC = 'https://disease.sh/v3/covid-19/countries'
const HISTORICAL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all'

export const getWorldWideData = () => axios.get(WORLD_WIDE)
export const getCountrySpecificData = () => axios.get(COUNTRY_SPECIFIC)
export const getHistoricalData = () => axios.get(HISTORICAL)
