import React from 'react';
import { withRouter, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SystemData from './system-view-components/SystemData';
import SystemCompatibility from './system-view-components/SystemCompatibility';
import SystemUpDownStream from './system-view-components/SystemUpDownStream';
import SystemUsers from './system-view-components/SystemUsers';
import SystemPOCs from './system-view-components/SystemPOCs';
import SystemComments from './system-view-components/SystemComments';

const SystemView = () => {
  const location = useLocation();
  //console.log(location.state.system)
  return (
    <Container>
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
  )
}

export default withRouter(SystemView)