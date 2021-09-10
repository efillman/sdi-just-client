import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';

const AboutView = () => {
  return (
    <Container data-cy='aboutview' className='m-2'>
      <Row>
        <h1>About</h1>
      </Row>
      <Row>
        <p>SDI Cohort 6 Group 3 Capstone Project</p>
        <p>Project Acomplished By:</p>
        <ListGroup bg='primary'>
          <ListGroup.Item className="border-0">Evan Fillman</ListGroup.Item>
          <ListGroup.Item className="border-0">Young Cho</ListGroup.Item>
          <ListGroup.Item className="border-0">Hector Hernandez</ListGroup.Item>
          <ListGroup.Item className="border-0">Matthew Yorke</ListGroup.Item>
        </ListGroup>
        <h3 className='mt-2'>Git Repo:
          <Nav.Link href="https://code.il2.dso.mil/tron/products/galvanize/cohort06/sdi06-03">JUST</Nav.Link>
        </h3>
      </Row>
    </Container >
  )
}
export default AboutView