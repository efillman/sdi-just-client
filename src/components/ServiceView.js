import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';

import DataHandler from '../DataHandler';
import ServiceUtility from '../ServiceUtility';

const ServiceView = (props) => {
  let history = useHistory();
  let serviceId = props.match.params.serviceid;
  const [systems, setSystems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceData, setServiceData] = useState({ service_short_name: "USSBB", service_long_name: "US Super Battle Buddies" });
  const [searchValue, setSearchValue] = useState('');
  const [searchSystems, setSearchSystems] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const dataHandler = new DataHandler();
    dataHandler.getServiceWithSystems(serviceId)
      .then((systems) => setSystems(systems.data))
      .then(() => ServiceUtility.getServiceById(serviceId))
      .then((service) => setServiceData(service))
      .then(() => setIsLoading(false))
  }, [serviceId]);

  const handleAddSystemClick = () => {
    history.push(`/system/0`);
  }

  const handleSystemNameClick = (system) => {
    history.push({
      pathname: `/system/${system.system_id}`,
      state: {
        system: system
      }
    });
  }

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      let upperSearchValue = searchValue.toUpperCase()
      let newSystems = systems.filter(system => {
        let upperSystemShortName = system.system_short_name.toUpperCase()
        let upperSystemLongName = system.system_long_name.toUpperCase()
        if (upperSystemShortName.includes(upperSearchValue) || upperSystemLongName.includes(upperSearchValue)) {
          return true;
        }
        return false;
      })
      setSearchSystems(newSystems)
    }
  }

  const showSystems = (systems) => {
    return systems.map((system) => {
      return (
        <Row key={system.system_id}>
          <ListGroup.Item >
            <Col xs={12} md={3} className="d-inline-flex justify-content-center mb-2 mb-md-0">
              <Button data-cy={`${serviceData.service_short_name}-system-TAIS`} variant={`${serviceData.service_short_name}L`} onClick={(e) => handleSystemNameClick(system)}>{system.system_short_name}</Button>
            </Col>
            <Col xs={12} md={6} className="d-inline-flex justify-content-center mb-2 mb-md-0">
              <Button data-cy={`${serviceData.service_short_name}-system-name`} ariant={`${serviceData.service_short_name}L`} onClick={(e) => handleSystemNameClick(system)}>{system.system_long_name}</Button>
            </Col>
            <Col xs={12} md={3} className="d-inline-flex justify-content-center">
              <Button variant={`${serviceData.service_short_name}L`}>{system.system_importance}</Button>
              <Button variant={`${serviceData.service_short_name}L`}>▲</Button>
              <Button variant={`${serviceData.service_short_name}L`}>▼</Button>
            </Col>
          </ListGroup.Item>
        </Row >
      )
    })
  }

  return (
    <Card bg={`${serviceData.service_short_name}L`} border={serviceData.service_short_name}>
      <Card.Header className="text-center">{serviceData.service_long_name}</Card.Header>
      <Image src={`/${serviceData.service_short_name}.png`}
        width="240"
        height="240"
        alt="Service Logo"
        className="justify-content-center" />
      <Container className="p-lg-4">
        <Row>
          <Col xs={12} md={5} lg={4} className="mb-1 mt-1 mb-lg-4">
            <InputGroup >
              <FormControl
                data-cy={`${serviceData.service_short_name}-system-search`}
                placeholder="System Name"
                aria-label="Search"
                aria-describedby="search"
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleEnterKey}
              />
              <InputGroup.Text
                data-cy={`${serviceData.service_short_name}-search-submit`}
                id="search">
                Search
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col md={5} lg={6} className="d-none d-md-flex" ></Col>
          <Col xs={12} md={2} lg={2} className="mb-1 mt-1 mb-lg-4 d-grid">
            <Button variant={serviceData.service_short_name} onClick={handleAddSystemClick}>
              Add System
            </Button>
          </Col>
        </Row>
        <ListGroup variant="flush">
          <Row>
            <ListGroup.Item key={'header'} className="d-none d-md-flex">
              <Col data-cy={`${serviceData.service_short_name}-system-data`} xs={12} md={3} className="d-inline-flex justify-content-center">
                Short Name
              </Col>
              <Col xs={12} md={6} className="d-inline-flex justify-content-center">
                Long Name
              </Col>
              <Col xs={12} md={3} className="d-inline-flex justify-content-center">
                Importance
              </Col>
            </ListGroup.Item>
          </Row>
          {isLoading ? null : ((searchValue === '' && searchSystems.length === 0) ? showSystems(systems) : showSystems(searchSystems))}
        </ListGroup>
      </Container >


    </Card >
    // <Card>This is the service data for service {props.service.service_id}</Card>
  )
}

export default withRouter(ServiceView);

const systems = [
  {
    "system_id": 3,
    "service_id": 2,
    "system_short_name": "TBMCS",
  },
  {
    "system_id": 4,
    "service_id": 2,
    "system_short_name": "AFATDS",
  },
  {
    "system_id": 12,
    "service_id": 2,
    "system_short_name": "SBB",
  },
  {
    "system_id": 11,
    "service_id": 2,
    "system_short_name": "YCBP"
  }
]
