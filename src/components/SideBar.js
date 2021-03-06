
import { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Menus } from '../resources/sideBarMenus.js';
import { LinkContainer } from 'react-router-bootstrap';

import '../styles/SideBar.scss'

export default function SideBar({ isInHeader }) {
  return (
    <Container className="full-side-bar">
      <Navbar bg='secondary'  expand="lg" className="full-side-bar mb-lg-0 p-0">
        <Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse bg='primary'>
            <Nav className={`sidebar-nav ${isInHeader ? 'in-header' : 'not-in-header'}`}>
              {Menus.map((menu, index) => {
                if (index === 0) {
                  return (
                    <LinkContainer key={menu.title} to={menu.url} key={menu.title}>
                      <Nav.Link data-cy={`nav-link-${menu.title}`} href={menu.url}>{menu.title}</Nav.Link>
                    </LinkContainer>
                  )
                } else {
                  return (
                    <NavDropdown data-cy={`sidebar-${menu.title}`} key={menu.title} title={menu.title} className={`nav-dropdown menus ${isInHeader ? 'in-header' : 'not-in-header'}`}>
                      {menu.subMenus.map(subMenu => (
                        <LinkContainer to={subMenu.url} data-cy={`nav-link-${subMenu.title}`} key={subMenu.title} ><NavDropdown.Item href={subMenu.url}>{subMenu.title}</NavDropdown.Item></LinkContainer>
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