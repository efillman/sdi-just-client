import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import SingleServiceData from './SingleServiceData';


const TrackerView = () => {

  return (
    <Container>
      <Row className="justify-content-center">
        {services.data.map((service) => {
          return <Col xs={12} lg={2}><SingleServiceData service={service} /></Col>
        })}
      </Row>
    </Container>
  )
}

const services = {
  "total": 6,
  "limit": 10,
  "skip": 0,
  "data": [
      {
          "service_id": 1,
          "service_short_name": "USA",
          "service_long_name": "United States Army"
      },
      {
          "service_id": 2,
          "service_short_name": "USMC",
          "service_long_name": "United States Marine Corps"
      },
      {
          "service_id": 3,
          "service_short_name": "USN",
          "service_long_name": "United States Navy"
      },
      {
          "service_id": 4,
          "service_short_name": "USAF",
          "service_long_name": "United States Air Force"
      },
      {
          "service_id": 5,
          "service_short_name": "USSF",
          "service_long_name": "United States Space Force"
      },
      {
          "service_id": 6,
          "service_short_name": "DOD/Other",
          "service_long_name": "DOD Agencies/Activites"
      }
  ]
}

export default TrackerView