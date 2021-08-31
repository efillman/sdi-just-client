import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Switch, Route } from "react-router-dom";


import HeaderBar from './components/HeaderBar.js';
import SideBar from './components/SideBar.js';
import MainView from './components/MainView.js';
import TrackerView from './components/TrackerView.js';
import ServiceView from './components/ServiceView.js';
import SystemView from './components/SystemView.js';
import AboutView from './components/AboutView.js';
import ExportView from './components/ExportView.js';
import SearchView from './components/SearchView.js';
import './App.css';

import { createContext } from 'react';

let cssHeaderBar = getComputedStyle(document.documentElement).getPropertyValue('--header-bar');
let cssSideBar = getComputedStyle(document.documentElement).getPropertyValue('--side-bar');
const DefaultColorScheme = {
  //Doing subString to get rid of the extra quotation mark within the quotation mark
  headerBar: cssHeaderBar.substring(2, cssHeaderBar.length - 1),
  sideBar: cssSideBar.substring(2, cssSideBar.length - 1)
}
export const ColorScheme = createContext(DefaultColorScheme);
function App() {
  console.log(DefaultColorScheme.sideBar)
  console.log(DefaultColorScheme.headerBar)
  return (
    <ColorScheme.Provider value={DefaultColorScheme}>
      <div className="App">
        <Container>
          <Row>
            <HeaderBar />
          </Row>
          <Row className="sidebar-main-view">
            <Col lg={2} className="d-none d-lg-block sidebar-main-view">
              <SideBar isInHeader={false} />
            </Col>
            <Col xs={12} lg={"auto"} className="sidebar-main-view">
            <Switch>
              <Route exact path="/">
                <MainView />
              </Route>
              <Route exact path="/tracker">
                <TrackerView />
              </Route>
              <Route path="/service/:serviceid">
                <ServiceView />
              </Route>
              <Route path="/system/:systemid">
                <SystemView />
              </Route>
              <Route exact path="/export">
                <ExportView />
              </Route>
              <Route exact path="/about">
                <AboutView />
              </Route>
            </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </ColorScheme.Provider>
  );
}

export default App;
