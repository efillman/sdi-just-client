
import { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ColorScheme } from '../App.js';
import { Menus } from '../resources/sideBarMenus.js';
import { LinkContainer } from 'react-router-bootstrap';

import '../styles/SideBar.css'

export default function SideBar({ isInHeader }) {
  const color = useContext(ColorScheme);
  return (
    <Container className="full-side-bar">
      <Navbar bg={color.sideBar} expand="lg" className="full-side-bar mb-lg-0 p-0">
        <Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse bg={color.headerBar}>
            <Nav className={`sidebar-nav ${isInHeader ? 'in-header' : 'not-in-header'}`}>
              {Menus.map((menu, index) => {
                if (index === 0) {
                  return (
                  <LinkContainer to={menu.url}>
                    <Nav.Link href={menu.url}>{menu.title}</Nav.Link>
                  </LinkContainer>
                  )
                } else {
                  return (
                    <NavDropdown key={menu.title} title={menu.title} className={`nav-dropdown menus ${isInHeader ? 'in-header' : 'not-in-header'}`}>
                    {menu.subMenus.map(subMenu => (
                      <LinkContainer to={subMenu.url}><NavDropdown.Item key={subMenu.title} href={subMenu.url}>{subMenu.title}</NavDropdown.Item></LinkContainer>
                    ))}
                  </NavDropdown>
                  )
                }
              })}
            </Nav>
          </Navbar.Collapse>
        </Row>
      </Navbar>
    </Container>
  )
}