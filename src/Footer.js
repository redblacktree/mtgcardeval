import React from 'react';
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Footer extends React.Component {
  render() {
    return (
      <Row className="header">
        <Col>
          <p>MTG Draft Helper is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.</p>
          <a href="https://github.com/redblacktree/mtgcardeval/issues">Report issues</a>
        </Col>
      </Row>
    )
  }
}

export default Footer;