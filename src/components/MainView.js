import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import biglogo from '../justpurplebig.png';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/CardHeader'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import joint from 'jointjs/index';
import { shapes, dia, V, g } from "jointjs/joint.mjs";

import '../styles/MainView.scss';

import '../styles/index.scss';

export default function MainView() {

  useEffect(() => {
    var erd = shapes.erd;

var graph = new dia.Graph();

var paper = new dia.Paper({
    el: document.getElementById('paper'),
    width: 700,
    height: 600,
    gridSize: 1,
    model: graph,
    linkPinning: false,
    linkConnectionPoint: function(linkView, elementView, magnet, reference) {
        var element = elementView.model;
        return element.getConnectionPoint(reference) || element.getBBox().center();
    }
});

// Define a specific highligthing path for every shape.

erd.Attribute.prototype.getHighlighterPath = function(w, h) {

    return ['M', 0, h / 2, 'A', w / 2, h / 2, '0 1,0', w, h / 2, 'A', w / 2, h / 2, '0 1,0', 0, h / 2].join(' ');
};

erd.Entity.prototype.getHighlighterPath = function(w, h) {

    return ['M', w, 0, w, h, 0, h, 0, 0, 'z'].join(' ');
};

erd.Relationship.prototype.getHighlighterPath = function(w, h) {

    return ['M', w / 2, 0, w, w / 2, w / 2, w, 0, w / 2, 'z'].join(' ');
};

erd.ISA.prototype.getHighlighterPath = function(w, h) {

    return ['M', - 8, 1, w + 8, 1, w / 2, h + 2, 'z'].join(' ');
};

// Define a specific connection points for every shape

erd.Attribute.prototype.getConnectionPoint = function(referencePoint) {
    // Intersection with an ellipse
    return g.Ellipse.fromRect(this.getBBox()).intersectionWithLineFromCenterToPoint(referencePoint);
};

erd.Entity.prototype.getConnectionPoint = function(referencePoint) {
    // Intersection with a rectangle
    return this.getBBox().intersectionWithLineFromCenterToPoint(referencePoint);
};

erd.Relationship.prototype.getConnectionPoint = function(referencePoint) {
    // Intersection with a rhomb
    var bbox = this.getBBox();
    var line = g.Line(bbox.center(), referencePoint);
    return (
    line.intersection(g.Line(bbox.topMiddle(), bbox.leftMiddle())) || line.intersection(g.Line(bbox.leftMiddle(), bbox.bottomMiddle())) || line.intersection(g.Line(bbox.bottomMiddle(), bbox.rightMiddle())) || line.intersection(g.Line(bbox.rightMiddle(), bbox.topMiddle())));
};

erd.ISA.prototype.getConnectionPoint = function(referencePoint) {
    // Intersection with a triangle
    var bbox = this.getBBox();
    var line = g.Line(bbox.center(), referencePoint);
    return (
    line.intersection(g.Line(bbox.origin(), bbox.topRight())) || line.intersection(g.Line(bbox.origin(), bbox.bottomMiddle())) || line.intersection(g.Line(bbox.topRight(), bbox.bottomMiddle())));
};

// Create shapes
var xcenter = 275;
var ytop = 25;

var wage = new erd.WeakEntity({

    position: {
        x: 350,
        y: 250
    },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Wage',
            'letter-spacing': 0,
            style: {
                'text-shadow': '1px 0 1px #333333'
            }
        },
        '.inner': {
            fill: '#523796',
            stroke: 'none',
            points: '155,5 155,55 5,55 5,5'
        },
        '.outer': {
            fill: 'none',
            stroke: '#9282b6',
            points: '160,0 160,60 0,60 0,0',
            filter: {
                name: 'dropShadow',
                args: {
                    dx: 0.5,
                    dy: 2,
                    blur: 2,
                    color: '#333333'
                }
            }
        }
    }
});

var paid = new erd.IdentifyingRelationship({

    position: {
        x: 385,
        y: 150
    },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Gets paid',
            'letter-spacing': 0,
            style: {
                'text-shadow': '1px 0 1px #333333'
            }
        },
        '.inner': {
            fill: '#9282b6',
            stroke: 'none'
        },
        '.outer': {
            fill: 'none',
            stroke: '#523796',
            filter: {
                name: 'dropShadow',
                args: {
                    dx: 0,
                    dy: 2,
                    blur: 1,
                    color: '#333333'
                }
            }
        }
    }
});

var employeeName = new erd.Normal({

    position: {
        x: 600,
        y: 550
    },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Name',
            'letter-spacing': 0,
            style: {
                'text-shadow': '1px 0 1px #333333'
            }
        },
        '.outer': {
            fill: '#9282b6',
            stroke: '#523796',
            filter: {
                name: 'dropShadow',
                args: {
                    dx: 0,
                    dy: 2,
                    blur: 2,
                    color: '#222138'
                }
            }
        }
    }
});

var skills = new erd.Multivalued({

    position: {
        x: 150,
        y: 90
    },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Skills',
            'letter-spacing': 0,
            style: {
                'text-shadow': '1px 0px 1px #333333'
            }
        },
        '.inner': {
            fill: '#9282b6',
            stroke: 'none',
            rx: 43,
            ry: 21

        },
        '.outer': {
            fill: '#523796',
            stroke: '#9282b6',
            filter: {
                name: 'dropShadow',
                args: {
                    dx: 0,
                    dy: 2,
                    blur: 2,
                    color: '#222138'
                }
            }
        }
    }
});

var amount = new erd.Derived({

    position: {
        x: 550,
        y: 255
    },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Importance',
            'letter-spacing': 0,
            style: {
                'text-shadow': '1px 0 1px #333333'
            }
        },
        '.inner': {
            fill: '#9282b6',
            stroke: 'none',
            'display': 'block'
        },
        '.outer': {
            fill: '#9282b6',
            stroke: '#523796',
            'stroke-dasharray': '3,1',
            filter: {
                name: 'dropShadow',
                args: {
                    dx: 0,
                    dy: 2,
                    blur: 2,
                    color: '#222138'
                }
            }
        }
    }
});

// Create new shapes by cloning
var serviceSquare = wage.clone().position(xcenter, ytop).attr('text/text', 'Service');
var hasMany1 = paid.clone().position(xcenter+35, ytop+100).attr('text/text', 'Has Many');
var systemSquare = wage.clone().position(xcenter, ytop+200).attr('text/text', 'USMTF Systems');
var importanceCircle = amount.clone().position(xcenter+200, ytop+205).attr('text/text', 'Importance');

var hasMany2 = paid.clone().position(xcenter+35, ytop+275).attr('text/text', 'Has Many');

//baselines area
var baselineSquare = wage.clone().position(xcenter-200, ytop+400).attr('text/text', 'USMTF Baselines');
var transmitCircle = employeeName.clone().position(xcenter-250, ytop+500).attr('text/text', 'Transmits');
var receiveCircle = employeeName.clone().position(xcenter-100, ytop+500).attr('text/text', 'Receives');

//org users
var organizationsSquare = wage.clone().position(xcenter, ytop+400).attr('text/text', 'Organizational Users');
var POCCircle = skills.clone().position(xcenter+25, ytop+500).attr('text/text', 'Contacts');

//connection area
var connectionsSquare = wage.clone().position(xcenter+200, ytop+400).attr('text/text', 'Connections');
var downstreamCircle = employeeName.clone().position(xcenter+150, ytop+500).attr('text/text', 'Downstreams');
var upstreamCircle = employeeName.clone().position(xcenter+300, ytop+500).attr('text/text', 'Upstreams');

// Helpers
var createLink = function(elm1, elm2) {
    var myLink = new erd.Line({
        markup: ['<path class="connection" stroke="black" d="M 0 0 0 0"/>', '<path class="connection-wrap" d="M 0 0 0 0"/>', '<g class="labels"/>', '<g class="marker-vertices"/>', '<g class="marker-arrowheads"/>'].join(''),
        source: {
            id: elm1.id
        },
        target: {
            id: elm2.id
        }
    });

    return myLink.addTo(graph);
};

// Add shapes to the graph
graph.addCells([serviceSquare, hasMany1, systemSquare, importanceCircle, hasMany2, organizationsSquare, POCCircle, connectionsSquare, receiveCircle, upstreamCircle,  downstreamCircle, transmitCircle, baselineSquare]);

createLink(serviceSquare, hasMany1);
createLink(systemSquare, hasMany1);
createLink(systemSquare, importanceCircle);
createLink(systemSquare, hasMany2);
createLink(baselineSquare, hasMany2);
createLink(baselineSquare, transmitCircle);
createLink(baselineSquare, receiveCircle);
createLink(organizationsSquare, hasMany2);
createLink(organizationsSquare, POCCircle);
createLink(connectionsSquare, hasMany2);
createLink(connectionsSquare, downstreamCircle);
createLink(connectionsSquare, upstreamCircle);
  }, []);

  return (
      <main className="container" data-cy='homepage'>



          <Card bg='tertiary'>
        <CardHeader>
          <Row className="justify-content-center mt-3">
            <Row className="justify-content-center">
            <Col xs={4} className="justify-content-center mb-lg-4 d-flex">
              <Image className="img-fluid" src={biglogo} alt="JUST logo big" /></Col>
            </Row>
            <Row className="justify-content-center">
            <Col className="text-center justify-content-center" xs={12}> <h1>Joint USMTF System Tracker</h1> </Col>
            </Row>
          </Row>
        </CardHeader>
        <Container className="main-view-data">
        <Row className="justify-content-center mt-3">
            <Col xs={12} className="justify-content-center px-4 mb-lg-4 d-flex">
              <span classname="h6">//JUST/ Aims to collect all known USMTF based systems through crowdsourcing data from The Joint Force. This effort will aid USMTF upgrade efforts.</span>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs={12} className="justify-content-center mb-lg-4 d-flex">
            <div id="paper"></div>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs={12} className="justify-content-center mb-lg-4 d-flex">
              <h2>How it Works/Instructions</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8} md={10} xs={12} >
            <ul>
                <li>Find a system you are a SME on</li>
                <ul>
                  <li>Systems are listed by service as many services use the same system</li>
                  <li>If a system you know about is not listed, add it!</li>
                  <li>Check if you agree with the "relative importance" of the system for that service</li>
                </ul>
                <li>Update the data on that system to the best of your knowledge, we are aiming to collect:</li>
                <ul>
                  <li>All system compatible USMTF baselines, including usmtf message send and receive types</li>
                  <li>All organizational users of that system in the given service</li>
                  <li>All upstream and downstream connected USMTF system-user pairs across the Joint Force</li>
                  <li>The best POCs for that system, especially program offices</li>
                </ul>
              </ul>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col className="text-center">
            <h5>Rules of Engagement</h5>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
            <p>This is a crowdsource system, every edit is live like wikipedia. Please browse responsibly</p>
            </Col>
          </Row>
        </Container>
      </Card>
      </main>
  )
}