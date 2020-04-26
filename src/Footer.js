import React from 'react';
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Footer extends React.Component {
  render() {
    return (
      <Row className="header">
        <Col>
          Problems? Questions? email me: dustin rasener at gmail
        </Col>
      </Row>
    )
  }
}

export default Footer;