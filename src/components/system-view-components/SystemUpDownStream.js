import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams, withRouter } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { LinkContainer } from "react-router-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import DataHandler from '../../DataHandler';
import ServiceUtility from '../../ServiceUtility';

const SystemUpDownStream = ({ match, viewMode, changeViewMode, setSystemViewSystem }) => {
  const location = useLocation();
  const history = useHistory();
  const systemid = match.params.systemid;
  const service_short_name = location.state.system.service.service_short_name;
  //When no system is passed from calling SystemData, it is in add mode
  const [system, setSystem] = useState(location.state ? location.state.system : null)
  const [upstreams, setUpstreams] = useState(location.state ? location.state.system.upstream_system_org : null)
  const [downstreams, setDownstreams] = useState(location.state ? location.state.system.downstream_system_org : null)
  const [isViewMode, setIsViewMode] = useState(viewMode === "VIEW" && systemid !== '0');
  const dataHandler = new DataHandler();


  useEffect(() => {
    dataHandler.getSystem(systemid)
      .then(response => {
        return addStreamSystemShortNameAndServiceShortName(response)
      })
      .then(data => {
        console.log(data)
        setSystem(data)
        setUpstreams(data.upstream_system_org)
        setDownstreams(data.downstream_system_org)
      })
  }, [isViewMode, systemid])

  const addStreamSystemShortNameAndServiceShortName = async (response) => {
    let allPromises = []
    for (let stream of response.downstream_system_org) {
      allPromises.push(dataHandler.getSystem(stream.system_organization.system_id)
        .then(system => stream.system_organization.system_short_name = system.system_short_name))
      allPromises.push(ServiceUtility.getServiceById(stream.system_organization.organization.service_id)
        .then(service => stream.system_organization.organization.service_short_name = service.service_short_name))
    }
    
    for (let stream of response.upstream_system_org) {
      allPromises.push(dataHandler.getSystem(stream.system_organization.system_id)
        .then(system => stream.system_organization.system_short_name = system.system_short_name))
      allPromises.push(ServiceUtility.getServiceById(stream.system_organization.organization.service_id)
        .then(service => stream.system_organization.organization.service_short_name = service.service_short_name))
    }

    return Promise.all(allPromises).then((values) => response)
  }

  const showCollapseButton = () => {
    return (
      <Button variant={system ? `${system.service.service_short_name}L` : `DODL`} onClick={() => changeViewMode("UpDownStream", "HIDE")}>
        Collapse View
      </Button>
    )
  }

  const handleUpstreamAddClick = (event) => {

  }

  const handleDownstreamAddClick = (event) => {
    
  }

  const showColumnHeader = (title, onClick) => {
    return (
      <ListGroup.Item key={'header'} className="d-md-flex">
        <Col xs={12} md={8}
          className={`d-inline-flex justify-content-center`}>
          {title}
        </Col>
        <Col xs={12} md={4} className="d-inline-flex justify-content-center">
          <Button variant={`${service_short_name}L`} onClick={(event) => onClick(event)}>
            Add/Edit
          </Button>
        </Col>
      </ListGroup.Item>
    )
  }

  const getStreamName = (stream) => {
    return `${stream.system_organization.organization.service_short_name}-${stream.system_organization.system_short_name}-${stream.system_organization.organization.organization_short_name}`
  }

  const showRowData = (dataRows) => {
    return (
      <ListGroup className="d-flex">
        {dataRows.map((row, index) => {
          return (
            <ListGroup.Item key={index}>              
              <Col xs={12} md={6}
                className={`d-inline-flex justify-content-center`}>
                {getStreamName(row)}
              </Col>
            </ListGroup.Item>
          )
        })
        }
      </ListGroup >
    )
  }

  const showSystemDataForm = () => {
    return (
      <Card.Body>
        <Formik
          initialValues={system ? {
            system_short_name: system.system_short_name,
            system_long_name: system.system_long_name,
            service_id: system.service_id,
            system_importance: system.system_importance,
            system_id: system.system_id
          } : {
            system_short_name: "",
            system_long_name: "",
            service_id: "",
            system_importance: ""
          }}
          onSubmit={async values => {
            if (system) {
              dataHandler.patchSystem(values)
                .then((response) => {
                  setIsViewMode(!isViewMode)
                })
            } else {
              dataHandler.postSystem(values)
                .then((response) => {
                  setIsViewMode(!isViewMode)
                  history.push(`/system/${response.system_id}`);
                })
            }
          }}

          validationSchema={Yup.object().shape({
            system_short_name: Yup.string()
              .required("Required"),
            system_long_name: Yup.string()
              .required("Required"),
            service_id: Yup.number()
              .integer()
              .required("Required"),
            system_importance: Yup.number()
              .integer()
              .notRequired()
          })}
        >         
        </Formik>
      </Card.Body>
    )
  }

  return (
    <Container>
      <Card>
        <Card.Header className="text-left d-flex">
          <Row className="align-items-center">
            <Col xs={12} md={7} lg={8} className="mb-1 mt-1">
              {system ? `${system.system_short_name} (${system.system_long_name})` : null}
            </Col>
            <Col md={1} lg={1} className="d-none d-md-flex" ></Col>
            <Col xs={12} md={4} lg={3} className="mb-1 mt-1">
              {isViewMode ? showCollapseButton() : null}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={6} className="mb-1 mt-1">
              <ListGroup background={`${service_short_name}XL`}>
                {showColumnHeader('Upstream (Receive From)', handleUpstreamAddClick)}
              </ListGroup>
              {showRowData(upstreams)}
            </Col>
            <Col xs={12} md={6} className="mb-1 mt-1">
              <ListGroup background={`${service_short_name}XL`}>
                {showColumnHeader('DownStream (Send To)', handleDownstreamAddClick)}
              </ListGroup>
              {showRowData(downstreams)}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}
export default withRouter(SystemUpDownStream)