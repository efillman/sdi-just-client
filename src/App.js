import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import HeaderBar from './components/HeaderBar.js';
import SideBar from './components/SideBar.js';
import MainView from './components/MainView.js';
import './App.css';

import { createContext } from 'react';

const DefaultColorScheme = {
  headerBar: 'primary',
  sideBar: 'secondary'
}
export const ColorScheme = createContext(DefaultColorScheme);

function App() {
  return (
    <ColorScheme.Provider value={DefaultColorScheme}>
      <div className="App">
        <Container>
          <Row>
          </Row>
          <Row>
            <HeaderBar />
          </Row>
          <Row className="sidebar-main-view">
            <Col lg={2} className="d-none d-lg-block sidebar-main-view">
              <SideBar isInHeader={false} />
            </Col>
            <Col xs={12} lg={"auto"} className="sidebar-main-view">
              <MainView />
            </Col>
          </Row>
        </Container>
      </div>
    </ColorScheme.Provider>
  );
}

export default App;
