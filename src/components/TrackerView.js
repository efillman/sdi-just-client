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
    dataHandler.getServices().then((services) => setServices(services.data)).then(() => setIsLoading(false))
  }, []);

  const updatePieData = (serviceId, newCount) => {
    if (pieData[serviceId - 1].value === newCount) {
      return;
    } else {
      let newPieData = JSON.parse(JSON.stringify(pieData))
      newPieData[serviceId - 1].value = newCount;
      setPieData(newPieData);
    }
  }

  const showPieChart = () => {
    return <ServicesPieChart pieData={pieData} />
  }

  const showSingleServiceDatas = () => {
    return (services.map((service) => {
      return <Col data-cy={`tracker-data-${service.service_short_name}`}
        xs={12} sm={6} md={4} lg={2} key={service.service_id}>
        <SingleServiceData service={service} updatePieData={updatePieData} />
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