import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form'
import { Formik } from "formik";
import * as Yup from "yup";

//columnSize is out of 11 instead of 12 grid
/*columns format :
[
  {
    columnName : 'column header name',
    field: 'row data prop name',
    size: based on 11 grid, 1 grid is alocated for edit button
  }
]
*/
const SystemViewReusableComponent = ({
  viewMode,
  changeViewMode,
  changeViewModeTarget,
  location,
  title,
  columns,
  rows,
  patch,
  post,
  setUpdatedRow
}) => {
  const service_short_name = location.state.system.service.service_short_name
  const system_id = location.state.system.system_id

  const [isViewMode, setIsViewMode] = useState(true);
  const [editData, setEditData] = useState(null);

  const handleAddClick = (event) => {
    setEditData(null);
    setIsViewMode(!isViewMode);
  }

  const handleEditClick = (event, rowData) => {
    setEditData(rowData);
    setIsViewMode(!isViewMode);
  }

  const showAddButton = () => {
    return (
      <Button variant={`${service_short_name}L`} onClick={handleAddClick}>
        Add
      </Button>
    )
  }

  const showCollapseButton = () => {
    return (
      <Button variant={`${service_short_name}L`} onClick={() => changeViewMode(changeViewModeTarget, "HIDE")}>
        Collapse View
      </Button>
    )
  }

  const showColumnHeader = () => {
    return (
      <ListGroup.Item key={'header'} className="d-none d-md-flex">
        {columns.map((column, index) => {
          return (
            <Col xs={12} md={column.size}
              className={`${column.size === 0 ? 'd-none' : 'd-inline-flex'} justify-content-center`}
              key={index}>
              {column.columnName}
            </Col>
          )
        })}
        <Col xs={12} md={1} className="d-inline-flex justify-content-center">
        </Col>
      </ListGroup.Item>
    )
  }

  const showRowData = () => {
    return (
      <ListGroup className="d-flex">
        {rows.map((row, index) => {
          return (
            <ListGroup.Item key={index}>
              {
                columns.map((column, index) => {
                  return (
                    <Col xs={12} md={column.size}
                      className={`${column.size === 0 ? 'd-none' : 'd-inline-flex'} justify-content-center`}
                      key={index}>
                      {row[column.field]}
                    </Col>
                  )
                })
              }

              <Col xs={12} md={1} className="d-inline-flex justify-content-center">
                <Button variant={`${service_short_name}L`} onClick={(event) => handleEditClick(event, row)}>
                  edit
                </Button>
              </Col>
            </ListGroup.Item>
          )
        })
        }
      </ListGroup >
    )
  }

  const showDataForm = (data) => {

    return (
      <Card.Body>
        <Formik
          initialValues={
            columns.reduce((values, column) => {
              if (!data && column.field.includes('_id'))
                return values
              values[column.field] = data ? data[column.field] : '';
              return values;
            }, {})}
          onSubmit={async values => {
            values.system_id = system_id
            console.log(values);
            if (data) {
              patch(values)
                .then((response) => {
                  setIsViewMode(!isViewMode)
                  setUpdatedRow(response)
                })
            } else {
              post(values)
                .then((response) => {
                  setIsViewMode(!isViewMode)
                  setUpdatedRow(response)
                })
            }
          }}

        // validationSchema={Yup.object().shape({
        //   system_short_name: Yup.string()
        //     .required("Required"),
        //   system_long_name: Yup.string()
        //     .required("Required"),
        //   service_id: Yup.number()
        //     .integer()
        //     .required("Required"),
        //   system_importance: Yup.number()
        //     .integer()
        //     .notRequired()
        // })}
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
                {
                  columns.map((column, index) => {
                    if (column.field.includes('_id'))
                      return null
                    return (
                      <Container>
                        <Form.Label htmlFor={`${column.field}`} style={{ display: "block" }}>
                          {`${column.columnName}`}:
                        </Form.Label>
                        <Form.Control
                          id={`${column.field}`} placeholder={`Enter ${column.columnName}`}
                          type='text'
                          value={values[column.field]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors[column.field] && touched[column.field]
                              ? "text-input error"
                              : "text-input"
                          } />
                        {errors[column.field] && touched[column.field] && (
                          <div className="input-feedback">{errors[column.field]}</div>
                        )}
                      </Container>
                    )
                  })
                }
                <Row>
                  <Button
                    variant={`${service_short_name}L`}
                    type="button"
                    className="outline"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </Button>
                  <Button variant={`${service_short_name}M`} type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Card.Body >
    )
  }


  return (
    <Container>
      <Card>
        <Card.Header className="text-left d-flex">
          <Row className="align-items-center">
            <Col xs={12} md={7} lg={8} className="mb-1 mt-1">
              {title ? title : ''}
            </Col>
            <Col md={1} lg={1} className="d-none d-md-flex" ></Col>
            <Col xs={12} md={4} lg={3} className="mb-1 mt-1">
              {isViewMode ? showAddButton() : null}
              {isViewMode ? showCollapseButton() : null}
            </Col>
          </Row>
        </Card.Header>
        <Row>
          {isViewMode ? null : showDataForm(editData)}
        </Row>
        <Row>
          <ListGroup background={`${service_short_name}XL`}>
            {showColumnHeader()}
          </ListGroup>
          {showRowData()}
        </Row>
      </Card>
    </Container>
  )
}
export default withRouter(SystemViewReusableComponent);