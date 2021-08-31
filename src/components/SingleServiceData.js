import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const SingleServiceData = (props) => {
  return (
    <Card >
      <Card.Header>{props.service.service_short_name}</Card.Header>
      <ListGroup variant="flush">
        {systems.data.map((system) => {
          return <ListGroup.Item>{system.system_short_name}</ListGroup.Item>
        })}
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