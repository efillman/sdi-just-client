import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';


const ServiceView = (props) => {
  return (
    <div>
    <div>This is the service view for service view {props.match.params['serviceid']}</div>
    <LinkContainer to="/system/1" ><Button variant="primary">System</Button></LinkContainer>
    </div>

  )
}
export default withRouter(ServiceView);