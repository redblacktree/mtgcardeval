import React from 'react';
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Footer extends React.Component {
  render() {
    return (
      <Row className="header">
        <Col>
          <a href="https://github.com/redblacktree/mtgcardeval/issues">Report issues</a>
        </Col>
      </Row>
    )
  }
}

export default Footer;