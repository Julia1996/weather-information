import { useState } from 'react'
import { useRouter } from 'next/router'
import { Card, Container, Row, Col } from 'react-bootstrap'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { WeatherEntity } from '../../types'
import { useDays } from '../../graphql/hooks/useDays'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import styles from '../../styles/City.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import Head from "next/head";

export default function City() {
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const router = useRouter()
  const { id } = router.query
  const { loading, error, data } = useDays(parseInt(id as string, 10), startDate, endDate)
  const days: WeatherEntity[] | null = data?.days
  const cityName: string | null = data?.cityName

  if (loading) return <Error/>
  if (error) return <Loading/>

  return (
    <>
      <Head>
        <title>Weather information in {cityName}</title>
        <meta name="description" content={`Weather information in ${cityName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Weather in {cityName}</h1>
      <div className={styles.filter}>
        <div className={styles.filter__element}>
          <label htmlFor="from" className={styles.filter__label}>From:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date as Date)}
            id="from"
          />
        </div>
        <div className={styles.filter__element}>
          <label htmlFor="to" className={styles.filter__label}>To:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date as Date)}
            id="to"
          />
        </div>
      </div>
      {days?.length ? (
        <Container>
          <Row>
            {days.map(day => {
              const date = moment(day.datetime).format('LL')
              return (
                <Col xs={12} md={6} xl={4} key={day.datetime}>
                  <Card className={styles['weather-card']}>
                    <Card.Body>
                      <Card.Title as="h2" className={styles['weather-card__title']}>
                        {date}
                      </Card.Title>
                      <table className={styles['weather-card__info']}>
                        <tbody>
                        <tr>
                          <td>Temperature</td>
                          <td>{day.temperature_min} - {day.temperature_max}</td>
                        </tr>
                        <tr>
                          <td>Precipitation probability</td>
                          <td>{day.precipitation_probability}</td>
                        </tr>
                        <tr>
                          <td>Precipitation</td>
                          <td>{day.precipitation_mm} mm</td>
                        </tr>
                        </tbody>
                      </table>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
      ) : (
        <p>No data</p>
      )}
    </>
  )
}
