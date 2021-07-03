import { useMemo, useState } from 'react'
import Head from 'next/head'
import { Form } from 'react-bootstrap'
import Link from 'next/link'
import { useCities } from '../graphql/hooks/useCities'
import { CityLink } from '../types'
import Error from '../components/Error'
import Loading from '../components/Loading'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { loading, error, data } = useCities()
  const cities: CityLink[] = data?.cities
  const [search, setSearch] = useState('')

  const citiesToDisplay = useMemo(() => {
    if (!search) return cities

    const regExp = new RegExp(`^${search}`, 'i')
    return cities.filter(city => regExp.test(city.name))
  }, [search, cities])

  if (loading) return <Loading/>
  if (error) return <Error/>

  return (
    <div className={styles.cities}>
      <Head>
        <title>Weather information</title>
        <meta name="description" content="Weather information home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Choose your city</h1>
      <p className={styles.cities__input}>
        <Form.Control
          placeholder="Start to enter your city..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </p>
      {citiesToDisplay.map(city => (
        <p key={city.id}>
          <Link href={`/city/${city.id}`} passHref>
            <a>{city.name}</a>
          </Link>
        </p>
      ))}
    </div>
  )
}
