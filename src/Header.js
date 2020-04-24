import React from 'react';
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Header extends React.Component {
  render() {
    return (
      <Row className="header">
        <Col>
          <h1>More than a Grade</h1>
        </Col>
      </Row>
    )
  }
}

export default Header;