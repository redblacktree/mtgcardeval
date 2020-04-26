import React from 'react';
import './index.css';
import Form from 'react-bootstrap/Form';
import ReactGA from "react-ga";

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.handleAutoplayChange = this.handleAutoplayChange.bind(this);
  }

  handleAutoplayChange(e) {
    ReactGA.event({
      category: 'Options Change',
      action: 'Autoplay',
      label: e.target.checked ? 'on' : 'off'
    });
    this.props.onOptionsChange({autoplay: e.target.checked})
  }

  render() {
    const options = this.props.options;

    return (
      <Form>
        <Form.Group controlId="autoplay">
          <Form.Check type="checkbox" label="Autoplay Videos" checked={options.autoplay} onChange={this.handleAutoplayChange} inline/>
        </Form.Group>
      </Form>
    )
  }
}

export default Options;