import React, { useState } from 'react';
import { withRouter, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import SystemData from './system-view-components/SystemData';
import SystemCompatibility from './system-view-components/SystemCompatibility';
import SystemUpDownStream from './system-view-components/SystemUpDownStream';
import SystemUsers from './system-view-components/SystemUsers';
import SystemPOCs from './system-view-components/SystemPOCs';
import SystemComments from './system-view-components/SystemComments';

const SystemView = () => {
  const location = useLocation();
  const [system, setSystem] = useState(location.state ? location.state.system : null);

  const showSystemDataTitle = () => {
    return (
      <Container>
        <Row>
          <Button variant={`${system.service.service_short_name}`}>{system.service.service_long_name}</Button>
        </Row>
        <Row className="d-inline-flex justify-content-center">
          {`${system.system_short_name} - ${system.system_long_name}`}
        </Row>
      </Container>
    )
  }
  console.log(system)
  return (
    <Card bg={`${system.service.service_short_name}L`} border={system.service.service_short_name} >
      <Card.Header className="text-center">{system ? showSystemDataTitle() : null}</Card.Header>
      <Container className="p-lg-4">
        <Row>
          <SystemData />
        </Row>
        <Row>
          <SystemCompatibility />
        </Row>
        <Row>
          <SystemUpDownStream />
        </Row>
        <Row>
          <SystemUsers />
        </Row>
        <Row>
          <SystemPOCs />
        </Row>
        <Row>
          <SystemComments />
        </Row>
      </Container>
    </Card>
  )
}

export default withRouter(SystemView)