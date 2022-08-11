import React from 'react'
import DataTable from 'react-data-table-component'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Countries = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountry, setFilteredCountry] = useState('')
  const [searchCap, setSearchCap] = useState('')

  const getData = async () => {
    const url = 'https://restcountries.com/v2/all'

    let data = await axios(url)
    setCountries(data.data)
    setFilteredCountry(data.data)
    try {
    } catch (error) {
      console.log(error.message)
    }
  }

  const columns = [
    {
      name: 'Country Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Capital',
      selector: row => row.capital,
      sortable: true,
    },
    {
      name: 'Region',
      selector: row => row.region,
      sortable: true,
    },
    {
      name: 'Flag',
      selector: row => (
        <img width={50} height={50} src={row.flag} alt={row.name} />
      ),
    },
  ]
  console.log()

  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    const result = countries.filter(country => {
      return search
        ? country.name.toLowerCase().match(search.toLowerCase()) ||
            country.alpha2Code?.toLowerCase().match(search.toLowerCase()) ||
            country.alpha3Code?.toLowerCase().match(search.toLowerCase()) ||
            country.capital?.toLowerCase().match(search.toLowerCase()) ||
            country.cioc?.toLowerCase().match(search.toLowerCase()) ||
            country.demonym?.toLowerCase().match(search.toLowerCase()) ||
            country.name?.toLowerCase().match(search.toLowerCase()) ||
            country.nativeName?.toLowerCase().match(search.toLowerCase()) ||
            country.region?.toLowerCase().match(search.toLowerCase()) ||
            country.subregion?.toLowerCase().match(search.toLowerCase()) ||
            (country.altSpellings &&
              country.altSpellings[0]
                .toLowerCase()
                .match(search.toLowerCase()) &&
              country.altSpellings[1]
                .toLowerCase()
                .match(search.toLowerCase()) &&
              country.altSpellings[2]
                .toLowerCase()
                .match(search.toLowerCase())) ||
            (country.currencies &&
              country.currencies[0].code
                .toLowerCase()
                .match(search.toLowerCase())) ||
            (country.currencies &&
              country.currencies[0].name
                .toLowerCase()
                .match(search.toLowerCase())) ||
            (country.currencies &&
              country.currencies[0].symbol
                .toLowerCase()
                .match(search.toLowerCase())) ||
            (country.languages &&
              country.languages[0].iso639_1
                .toLowerCase()
                .match(search.toLowerCase())) ||
            (country.languages &&
              country.languages[0].iso639_2
                .toLowerCase()
                .match(search.toLowerCase())) ||
            (country.languages &&
              country.languages[0].name
                .toLowerCase()
                .match(search.toLowerCase())) ||
            (country.languages &&
              country.languages[0].nativeName.toLowerCase().match(search))
        : country.capital?.toLowerCase().match(searchCap.toLowerCase())
    })

    setFilteredCountry(result)
  }, [search, searchCap])
  console.log(filteredCountry)
  console.log(searchCap)
  return (
    <div className="container">
      <DataTable
        title="Country List"
        columns={columns}
        data={filteredCountry}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="600px"
        highlightOnHover
        striped
        subHeader
        subHeaderAlign="center"
        subHeaderComponent={
          <div className="d-flex,flex-column , w-50">
            <input
              type="text"
              placeholder="Search anything"
              className="form-control w-100"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchCap('')}
            />

            <input
              type="text"
              placeholder="Search Capital"
              className="form-control , mt-5"
              onFocus={() => setSearch('')}
              value={searchCap}
              onChange={e => setSearchCap(e.target.value)}
            />
          </div>
        }
      />
    </div>
  )
}

export default Countries
