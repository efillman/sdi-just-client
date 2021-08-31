import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import DataHandler from '../DataHandler';
import SingleServiceData from './SingleServiceData';
import PieRechartComponent from './Pie.rechart.js'

const TrackerView = () => {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true);
    const dataHandler = new DataHandler();
    dataHandler.getServices().then((services) => setServices(services)).then(() => setIsLoading(false))
  }, []);

  const showSingleServiceDatas = () => {
    return (services.data.map((service) => {
        return <Col xs={12} sm={6} md={4} lg={2} key={service.service_id}><SingleServiceData service={service} /></Col>
    }))
  };

  return (
    <Container>
      <Row className="p-lg-4 justify-content-center">
        <PieRechartComponent />
        {isLoading ? null : showSingleServiceDatas()}
      </Row>
    </Container>
  )
}

export default TrackerView