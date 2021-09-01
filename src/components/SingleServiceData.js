import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import DataHandler from '../DataHandler';
import '../styles/SingleServiceData.scss';

const SingleServiceData = ({ service, updatePieData }) => {
  const [systems, setSystems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true);
    const dataHandler = new DataHandler();
    dataHandler.getServiceWithSystems(service.service_id).then((systems) => setSystems(systems.data)).then(() => setIsLoading(false))
  }, [service.service_id]);

  const showSystems = () => {
    //return "showing systems";
    updatePieData(service.service_id, systems.length)
    return systems.map((system) => {
      return <ListGroup.Item variant={`${service.service_short_name}XL`} key={system.system_id}>{system.system_short_name}</ListGroup.Item>
    })
  }

  return (
    <Card bg={`${service.service_short_name}L`} border={service.service_short_name}>
      <Card.Header >{service.service_short_name}</Card.Header>
      <ListGroup variant="flush">
        {isLoading ? null : showSystems()}
      </ListGroup>
    </Card >
    // <Card>This is the service data for service {props.service.service_id}</Card>
  )
}

export default SingleServiceData