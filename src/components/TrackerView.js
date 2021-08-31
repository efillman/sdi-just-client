import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import DataHandler from '../DataHandler';
import SingleServiceData from './SingleServiceData';
import ServicesPieChart from './Pie.rechart.js'

const defaultPieData = [
  {
    "name": "USA",
    "value": 0
  },
  {
    "name": "USMC",
    "value": 0
  },
  {
    "name": "USN",
    "value": 0
  },
  {
    "name": "USAF",
    "value": 0
  },
  {
    "name": "USSF",
    "value": 0
  },
  {
    "name": "DOD/Other",
    "value": 0
  }
];

const TrackerView = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pieData, setPieData] = useState(defaultPieData);

  useEffect(() => {
    setIsLoading(true);
    const dataHandler = new DataHandler();
    dataHandler.getServices().then((services) => setServices(services)).then(() => setIsLoading(false))
  }, []);

  const showPieChart = () => {
    return <ServicesPieChart pieData={pieData} />
  }

  const showSingleServiceDatas = () => {
    return (services.data.map((service) => {
      return <Col xs={12} sm={6} md={4} lg={2} key={service.service_id}>
        <SingleServiceData service={service} setPieData={setPieData} />
      </Col>
    })
    )
  };

  return (
    <Container>
      <Row className="p-lg-4 justify-content-center">
        {isLoading ? null : showPieChart()}
      </Row>
      <Row className="p-lg-4 justify-content-center">

        {isLoading ? null : showSingleServiceDatas()}
      </Row>
    </Container>
  )
}

export default TrackerView