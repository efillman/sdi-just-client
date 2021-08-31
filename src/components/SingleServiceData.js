import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import DataHandler from '../DataHandler';

const SingleServiceData = ({ service , updatePieData}) => {
  const [systems, setSystems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true);
    const dataHandler = new DataHandler();
    dataHandler.getServiceWithSystems(service.service_id).then((systems) => setSystems(systems)).then(() => setIsLoading(false))
  }, [service.service_id]);

  const showSystems = () => {
    updatePieData(service.service_id, systems.data.length)
    return systems.data.map((system) => {
      return <ListGroup.Item key={system.system_id}>{system.system_short_name}</ListGroup.Item>
    })
  }

  return (
    <Card >
      <Card.Header>{service.service_short_name}</Card.Header>
      <ListGroup variant="flush">
        {isLoading ? null : showSystems()}
      </ListGroup>
    </Card >
    // <Card>This is the service data for service {props.service.service_id}</Card>
  )
}

const systems = {
  "data": [
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
}

export default SingleServiceData