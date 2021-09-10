import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import DataHandler from '../DataHandler';
import Button from 'react-bootstrap/Button';
import '../styles/SingleServiceData.scss';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col } from 'react-bootstrap';

const SingleServiceData = ({ service, updatePieData }) => {
  let history = useHistory();
  const [systems, setSystems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true);
    const dataHandler = new DataHandler();
    dataHandler.getServiceWithSystems(service.service_id).then((systems) => setSystems(systems.data)).then(() => setIsLoading(false))
  }, [service.service_id]);

  const handleServiceNameClick = () => {
    history.push({
      pathname: `/service/${service.service_id}`,
    });
  }

  const handleSystemNameClick = (system) => {
    history.push({
      pathname: `/system/${system.system_id}`,
      state: {
        system: system
      }
    });
  }

  const showSystems = () => {
    //return "showing systems";
    updatePieData(service.service_id, systems.length)
    return systems.map((system) => {
      return <ListGroup.Item onClick={(e) => handleSystemNameClick(system)} style={{ cursor: "pointer" }} variant={`${service.service_short_name}XL`} key={system.system_id}>
        {system.system_short_name}
      </ListGroup.Item>
    })
  }

  return (
    <Card bg={`${service.service_short_name}L`} border={service.service_short_name}>
      <Card.Header onClick={handleServiceNameClick} style={{ cursor: "pointer" }}>
        {service.service_short_name + '   [' + systems.length + ']'}
      </Card.Header>
      <ListGroup variant="flush" className="single-service-data-scroll">
        {isLoading ? null : showSystems()}
      </ListGroup>
    </Card >
    // <Card>This is the service data for service {props.service.service_id}</Card>
  )
}

export default SingleServiceData