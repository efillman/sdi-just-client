import React, { useState, useEffect } from 'react';
import { withRouter, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
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

  //conditions for below, "HIDE", "VIEW"
  const [Data, setData] = useState("VIEW");
  const [Compatibility, setCompatibility] = useState("HIDE");
  const [UpDownStream, setUpDownStream] = useState("HIDE");
  const [Users, setUsers] = useState("HIDE");
  const [POCs, setPOCs] = useState("HIDE");
  const [Comments, setComments] = useState("HIDE");
  const [cardVariant, setCardVariant] = useState("DODL");
  const [listGroupItemVariant, setListGroupItemVaraint] = useState("primary")

  useEffect(() => {
    setCardVariant(system ? `${system.service.service_short_name}L` : "DODL");
    setListGroupItemVaraint(system ? `${system.service.service_short_name}XL` : "DODXL");
  }, [system])

  const showSystemDataTitle = () => {
    return (
      <Row>
        {system.service.service_long_name}
      </Row>
    )
  }

const showPlaceHolder = (target) => {
  console.log(target + " placeholder");
  return (
    <Container onClick={() => changeViewMode(target, "VIEW")}>
        {"System " + target} Click to Expand
    </Container>
  )
}

const changeViewMode = (target, value) => {
  eval(`set${target}(value)`);
}

  return (
    <Card bg={cardVariant} border={system ? system.service.service_short_name : `DOD`} >
      <Card.Header className="text-center">{system ? showSystemDataTitle() : null}</Card.Header>
      <ListGroup variant="flush" className="p-lg-4">
        <ListGroup.Item variant={listGroupItemVariant}>
          {Data !== "HIDE" ? <SystemData viewMode={Data} changeViewMode={changeViewMode} /> : showPlaceHolder("Data")}
        </ListGroup.Item>
        <ListGroup.Item variant={listGroupItemVariant}>
          {Compatibility !== "HIDE" ? <SystemCompatibility viewMode={Compatibility} /> : showPlaceHolder("Compatibility")}
        </ListGroup.Item>
        <ListGroup.Item variant={listGroupItemVariant}>
          {UpDownStream !== "HIDE" ? <SystemUpDownStream viewMode={UpDownStream} /> : showPlaceHolder("UpDownStream")}
        </ListGroup.Item>
        <ListGroup.Item variant={listGroupItemVariant}>
          {Users !== "HIDE" ? <SystemUsers viewMode={Users} /> : showPlaceHolder("Users")}
        </ListGroup.Item>
        <ListGroup.Item variant={listGroupItemVariant}>
          {POCs !== "HIDE" ? <SystemPOCs viewMode={POCs} /> : showPlaceHolder("POCs")}
        </ListGroup.Item>
        <ListGroup.Item variant={listGroupItemVariant}>
          {Comments !== "HIDE" ? <SystemComments viewMode={Comments} /> : showPlaceHolder("Comments")}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default withRouter(SystemView)