import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { LinkContainer } from "react-router-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const SystemData = () => {
  const location = useLocation();
  const [system, setSystem] = useState(location.state ? location.state.system : null)
  const [isViewSystem, setIsViewSystemMode] = useState(true);

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
      <Button variant="primary" onClick={handleAddEditSystemClick}>
        {system ? 'Edit' : 'Add'}
      </Button>
    )
  }

  const showSystemDataForm = () => {
    return (
      <Card.Body>
        <Formik
          initialValues={system ? system : {
            system_short_name: "",
            system_long_name: "",
            service_id: "",
            system_importance: ""
          }}
          onSubmit={async values => {
            await new Promise(resolve => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
          validationSchema={Yup.object().shape({
            system_short_name: Yup.string()
              .required("Required"),
            system_long_name: Yup.string()
              .required("Required"),
            service_id: Yup.number()
              .required("Required"),
            system_importance: Yup.number()
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
                <Form.Label htmlFor="short_name" style={{ display: "block" }}>
                  Short Name:
                </Form.Label>
                <Form.Control
                  id="short_name"
                  placeholder="Enter Service Abbreviation"
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
                <Row>
                  <Button
                    type="button"
                    className="outline"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
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
            <Col xs={12} md={2} lg={2} className="mb-1 mt-1">
              System Data
            </Col>
            <Col md={8} lg={8} className="d-none d-md-flex" ></Col>
            <Col xs={12} md={2} lg={2} className="mb-1 mt-1">
              {isViewSystem ? showSystemAddEditButton() : null}
            </Col>
          </Row>
        </Card.Header>
        {isViewSystem ? (system ? showSystemData() : null) : showSystemDataForm()}
      </Card>
    </Container>
  )
}
export default SystemData