import { useContext } from 'react';
// import logo from '../justlogo.png';
import logo from '../just.svg';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Anchor from 'react-bootstrap/Anchor';
import Image from 'react-bootstrap/Image';
import { ColorScheme } from '../App.js';

import SideBar from './SideBar.js';

import '../styles/HeaderBar.css';

export default function HeaderBar() {
  const color = useContext(ColorScheme);
  return (
    <header className={`p-3 bg-${color.headerBar} text-white`}>
      <Container>
        <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
          <Col xs={12} lg={2} className="d-flex align-items-center mb-2 mb-lg-0 ms-lg-3 ">
            <Anchor href="/" className="text-white text-decoration-none">
              <Image src={logo} className="JUST-logo" alt="JUST logo" thumbnail />
            </Anchor>
          </Col>
          {/* Provides empty space between Logo and Search Bar when in lg view */}
          <Col lg={"auto"} className="d-none d-lg-block me-lg-auto justify-content-center mb-md-0">
          </Col>
          {/* Show menu toggle when smaller than lg view */}
          <Col xs={2} md={1} className="d-block d-lg-none">
            <SideBar isInHeader={true} />
          </Col>
          <Col xs={10} md={11} lg={3} className=" mb-lg-0 me-lg-3 ">
            <form >
              <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
            </form>
          </Col>
        </div>
      </Container>
    </header>
  )
}