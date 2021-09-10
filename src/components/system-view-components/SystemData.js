import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams, withRouter } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { LinkContainer } from "react-router-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import DataHandler from '../../DataHandler';

const SystemData = ({ match, viewMode, changeViewMode, setSystemViewSystem }) => {
  const location = useLocation();
  const history = useHistory();
  const systemid = match.params.systemid;
  //When no system is passed from calling SystemData, it is in add mode
  const [system, setSystem] = useState(location.state ? location.state.system : null)
  const [isViewSystem, setIsViewSystemMode] = useState(viewMode === "VIEW" && systemid !== '0');
  const dataHandler = new DataHandler();


  useEffect(() => {
    console.log(match.params.systemid)
    if (systemid !== '0' && isViewSystem) {
      dataHandler.getSystem(systemid)
        .then(data => {
          if (!system) setSystemViewSystem(data)
          setSystem(data)
        })
    }
  }, [isViewSystem, systemid])

  const handleAddEditSystemClick = (event) => {
    setIsViewSystemMode(!isViewSystem);
  }

  const showSystemData = () => {
    return (
      <Card.Body>
        <Card.Text>Short Name: {system.system_short_name}</Card.Text>
        <Card.Text>Long Name: {system.system_long_name}</Card.Text>
        <Card.Text>Service Name: {system.service.service_long_name}</Card.Text>
      </Card.Body>
    )
  }

  const showSystemAddEditButton = () => {
    return (
      <Button variant={system ? `${system.service.service_short_name}L` : `DODL`} onClick={handleAddEditSystemClick}>
        {system ? 'Edit' : 'Add'}
      </Button>
    )
  }

  const showSystemCollapseButton = () => {
    return (
      <Button variant={system ? `${system.service.service_short_name}L` : `DODL`} onClick={() => changeViewMode("Data", "HIDE")}>
        Collapse View
      </Button>
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
                  setIsViewSystemMode(!isViewSystem)
                })
            } else {
              dataHandler.postSystem(values)
                .then((response) => {
                  setIsViewSystemMode(!isViewSystem)
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
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="system_short_name" style={{ display: "block" }}>
                  System Abbreviation:
                </Form.Label>
                <Form.Control
                  id="system_short_name"
                  placeholder="Enter System Abbreviation"
                  type="text"
                  value={values.system_short_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.system_short_name && touched.system_short_name
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.system_short_name && touched.system_short_name && (
                  <div className="input-feedback">{errors.system_short_name}</div>
                )}
                <Form.Label htmlFor="system_long_name" style={{ display: "block" }}>
                  System Full Name:
                </Form.Label>
                <Form.Control
                  id="system_long_name"
                  placeholder="Enter System Full Name"
                  type="text"
                  value={values.system_long_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.system_long_name && touched.system_long_name
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.system_long_name && touched.system_long_name && (
                  <div className="input-feedback">{errors.system_long_name}</div>
                )}
                <Form.Label htmlFor="service_id" style={{ display: "block" }}>
                  Service System Belong To:
                </Form.Label>
                <Form.Select
                  id="service_id"
                  placeholder="Choose Service Abbreviation"
                  value={values.service_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.service_service_id && touched.service_id
                      ? "text-input error"
                      : "text-input"
                  }
                >
                  <option>Choose Service</option>
                  <option value="1">USA</option>
                  <option value="2">USMC</option>
                  <option value="3">USN</option>
                  <option value="4">USAF</option>
                  <option value="5">USSF</option>
                  <option value="6">DOD</option>
                </Form.Select>
                {errors.service_id && touched.service_id && (
                  <div className="input-feedback">{errors.service_id}</div>
                )}
                <Row>
                  <Button
                    variant={system ? `${system.service.service_short_name}L` : 'primary'}
                    type="button"
                    className="outline"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </Button>
                  <Button variant={system ? `${system.service.service_short_name}M` : 'primary'} type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Row>
              </Form>
            );
          }}
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
              {isViewSystem ? showSystemAddEditButton() : null}
              {isViewSystem ? showSystemCollapseButton() : null}
            </Col>
          </Row>
        </Card.Header>
        {isViewSystem ? (system ? showSystemData() : null) : showSystemDataForm()}
      </Card>
    </Container>
  )
}
export default withRouter(SystemData)