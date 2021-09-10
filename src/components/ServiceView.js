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

import USAPNG from '../usa.png';
import USMCPNG from '../usmc.png';
import USNPNG from '../usn.png';
import USAFPNG from '../usaf.png';
import USSFPNG from '../ussf.png';
import DODPNG from '../dod.png';

import '../styles/ServiceView.scss';

// import logo from './logo.png'; // Tell webpack this JS file uses this image

// console.log(logo); // /logo.84287d09.png

const ServiceView = (props) => {
  let history = useHistory();
  let serviceId = props.match.params.serviceid;
  const [systems, setSystems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceData, setServiceData] = useState({ service_short_name: "USSBB", service_long_name: "US Super Battle Buddies" });
  const [searchValue, setSearchValue] = useState('');
  const [searchSystems, setSearchSystems] = useState(null);
  const [data, setData] = useState({});
  const [didUpdate, setDidUpdate] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [systemsPerPage, setPageSystems] = useState(null)
  const dataHandler = new DataHandler();

  useEffect(() => {
    setIsLoading(true);
    //const dataHandler = new DataHandler();
    dataHandler.getServiceWithSystems(serviceId)
      .then((systems) => setSystems(systems.data))
      .then(() => ServiceUtility.getServiceById(serviceId))
      .then((service) => setServiceData(service))
      .then(() => setIsLoading(false))
  }, [serviceId, didUpdate]);

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

  const handleSystemImportanceUp = (system) => {
    dataHandler.changeImportance(system, false).then((data) => setData(data)).then(() => setDidUpdate(!didUpdate))
  }

  const handleSystemImportanceDown = (system) => {
    dataHandler.changeImportance(system, true).then((data) => setData(data)).then(() => setDidUpdate(!didUpdate))
  }

  const handleKeyPress = (event) => {
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
    } else if (searchValue.length === 0) {
      setSearchSystems(null)
    }
  }

  const showSystems = (systems) => {
    return (
      <Row className="service-view-data">
        {systems.map((system) => {
          return (
            <Row key={system.system_id}>
              <ListGroup.Item variant={`${serviceData.service_short_name}XL`}>
                <Col xs={12} md={3} className="d-inline-flex justify-content-center mb-2 mb-md-0">
                  <Button data-cy={`${serviceData.service_short_name}-system-TAIS`} variant={`${serviceData.service_short_name}L`} onClick={(e) => handleSystemNameClick(system)}>{system.system_short_name}</Button>
                </Col>
                <Col xs={12} md={6} className="d-inline-flex justify-content-center mb-2 mb-md-0">
                  <Button data-cy={`${serviceData.service_short_name}-system-name`} variant={`${serviceData.service_short_name}L`} onClick={(e) => handleSystemNameClick(system)}>{system.system_long_name}</Button>
                </Col>
                <Col xs={12} md={3} className="d-inline-flex justify-content-center">
                  <Button variant={`${serviceData.service_short_name}L`}>{system.system_importance}</Button>
                  <Button onClick={(e) => handleSystemImportanceUp(system)} variant={`${serviceData.service_short_name}L`}>▲</Button>
                  <Button onClick={(e) => handleSystemImportanceDown(system)} variant={`${serviceData.service_short_name}L`}>▼</Button>
                </Col>
              </ListGroup.Item>
            </Row >
          )
        })}
      </Row>
    )
  }

  const switchServiceImage = (serviceId) => {
    switch (parseInt(serviceId)) {
      case 1:
        return USAPNG;
      case 2:
        return USMCPNG;
      case 3:
        return USNPNG;
      case 4:
        return USAFPNG;
      case 5:
        return USSFPNG;
      default:
        return DODPNG;
    }
  }

  return (
    <Card bg={`${serviceData.service_short_name}L`} border={serviceData.service_short_name} >
      <Card.Header className="text-center h2">{serviceData.service_long_name}</Card.Header>
      <Container className="p-lg-4">
        <Row>
          <Col xs={12} className="justify-content-center mb-lg-4 d-flex">
          <Image src={switchServiceImage(serviceData.service_id)}
              width="160"
              height="160"
              alt="Service Logo"
              className="" />
          </Col>
          <Col xs={12} md={5} lg={4} className="mb-1 mt-1 mb-lg-4">
            <InputGroup >
              <FormControl
                background={`${serviceData.service_short_name}XL`}
                data-cy={`${serviceData.service_short_name}-system-search`}
                placeholder="System Name"
                aria-label="Search"
                aria-describedby="search"
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </InputGroup>
          </Col>
          <Col md={5} lg={6} className="d-none d-md-flex" ></Col>
          <Col xs={12} md={2} lg={2} className="mb-1 mt-1 mb-lg-4 d-grid">
            <Button variant={`${serviceData.service_short_name}M`} onClick={handleAddSystemClick}>
              Add System
            </Button>
          </Col>
        </Row>
        <ListGroup background={`${serviceData.service_short_name}XL`}>
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
          {isLoading ? null : ((!searchSystems) ? showSystems(systems) : showSystems(searchSystems))}
        </ListGroup>
      </Container >
    </Card >
    // <Card>This is the service data for service {props.service.service_id}</Card>
  )
}

export default withRouter(ServiceView);