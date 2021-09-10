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

import '../styles/SystemView.scss';

const SystemView = () => {
  const location = useLocation();
  const [system, setSystem] = useState(location.state ? location.state.system : null);

  //conditions for below, "HIDE", "VIEW", "EDIT"

  const [systemViewStates, setSystemViewStates] = useState(
    {
      Data: system ? "VIEW" : "EDIT",
      Compatibility: "HIDE",
      UpDownStream: "HIDE",
      Users: "HIDE",
      POCs: "HIDE",
      Comments: "HIDE"
    }
  );

  const [Data, setData] = useState("VIEW");
  const [Compatibility, setCompatibility] = useState("HIDE");
  const [UpDownStream, setUpDownStream] = useState("HIDE");
  const [Users, setUsers] = useState("HIDE");
  const [POCs, setPOCs] = useState("HIDE");
  const [Comments, setComments] = useState("HIDE");

  const [cardVariant, setCardVariant] = useState("DODL");
  const [cardBorder, setCardBorder] = useState("DODM");
  const [listGroupItemVariant, setListGroupItemVaraint] = useState("primary")

  useEffect(() => {
    setCardVariant(system ? `${system.service.service_short_name}L` : "DODL");
    setCardBorder(system ? `${system.service.service_short_name}M` : "DODM");
    setListGroupItemVaraint(system ? `${system.service.service_short_name}XL` : "DODXL");
  }, [system])

  const showPlaceHolder = (target) => {
    console.log(target + " placeholder");
    return system ? (
      <Container onClick={() => changeViewMode(target, "VIEW")}>
        {"System " + target} Click to Expand
      </Container>
    ) : null;
  }

  const changeViewMode = (target, value) => {
    console.log("target value", target, value);

    const newViewStates = Object.assign({}, systemViewStates);
    //var newViewStates = () => {return systemViewStates};
    console.log("new state data", newViewStates)
    newViewStates[target] = value;
    setSystemViewStates(newViewStates);

    console.log("updated state", systemViewStates);
  }

  const hideAll = () => {
    console.log("hiding all");
    setSystemViewStates(
      {
        Data: "HIDE",
        Compatibility: "HIDE",
        UpDownStream: "HIDE",
        Users: "HIDE",
        POCs: "HIDE",
        Comments: "HIDE"
      }
    );
  }

  const showAll = () => {
    console.log("showing all");
    setSystemViewStates(
      {
        Data: "VIEW",
        Compatibility: "VIEW",
        UpDownStream: "VIEW",
        Users: "VIEW",
        POCs: "VIEW",
        Comments: "VIEW"
      }
    );
  }

  return (
    <Card bg={cardVariant} border={cardBorder} >
      <Card.Header className="h2 text-center">{system ? system.service.service_long_name : null}</Card.Header>
      <Container className="p-lg-4">
        <Row>
        <Col xs={12} md={2} lg={2} className="mb-1 mt-1">
        <Button variant={cardBorder} onClick={showAll}>
              Show All
            </Button>
          </Col>
          <Col xs={12} md={8} lg={8} className="h4 text-center" >
            {system.system_short_name}
          </Col>
          <Col xs={12} md={2} lg={2} className="mb-1 mt-1 mb-lg-4 d-grid">
          <Button variant={cardBorder} onClick={hideAll}>
              Hide All
            </Button>
          </Col>
        </Row>
        <ListGroup variant="flush" className="p-lg-4 system-view-data">
          <ListGroup.Item variant={listGroupItemVariant}>
            {systemViewStates.Data !== "HIDE" ? <SystemData viewMode={systemViewStates.Data} changeViewMode={changeViewMode} setSystemViewSystem={setSystem} /> : showPlaceHolder("Data")}
          </ListGroup.Item>
          <ListGroup.Item variant={listGroupItemVariant}>
            {systemViewStates.Compatibility !== "HIDE" ? <SystemCompatibility viewMode={systemViewStates.Compatibility} changeViewMode={changeViewMode} setSystemViewSystem={setSystem} /> : showPlaceHolder("Compatibility")}
          </ListGroup.Item>
          <ListGroup.Item variant={listGroupItemVariant}>
            {systemViewStates.UpDownStream !== "HIDE" ? <SystemUpDownStream viewMode={systemViewStates.UpDownStream} changeViewMode={changeViewMode} setSystemViewSystem={setSystem} /> : showPlaceHolder("UpDownStream")}
          </ListGroup.Item>
          <ListGroup.Item variant={listGroupItemVariant}>
            {systemViewStates.Users !== "HIDE" ? <SystemUsers viewMode={systemViewStates.Users} changeViewMode={changeViewMode} setSystemViewSystem={setSystem} /> : showPlaceHolder("Users")}
          </ListGroup.Item>
          <ListGroup.Item variant={listGroupItemVariant}>
            {systemViewStates.POCs !== "HIDE" ? <SystemPOCs viewMode={systemViewStates.POCs} changeViewMode={changeViewMode} setSystemViewSystem={setSystem} /> : showPlaceHolder("POCs")}
          </ListGroup.Item>
          <ListGroup.Item variant={listGroupItemVariant}>
            {systemViewStates.Comments !== "HIDE" ? <SystemComments viewMode={systemViewStates.Comments} changeViewMode={changeViewMode} setSystemViewSystem={setSystem} /> : showPlaceHolder("Comments")}
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </Card>
  )
}

export default withRouter(SystemView)