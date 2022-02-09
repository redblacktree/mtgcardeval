import React from 'react';
import './index.css';
import Form from 'react-bootstrap/Form';
import ReactGA from "react-ga";
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlaybackRateChange = this.handlePlaybackRateChange.bind(this);
    this.handleGradeDisplayChange = this.handleGradeDisplayChange.bind(this);
  }

  handlePlaybackRateChange(value) {
    this.props.onOptionsChange({playbackRate: value, gradeDisplay: this.props.options.gradeDisplay});
  }

  handleGradeDisplayChange(value) {
    this.props.onOptionsChange({playbackRate: this.props.options.playbackRate, gradeDisplay: value})
  }

  render() {
    const options = this.props.options;

    return (
      <div className="panel panel-default options">
        <Form className="panel-body">
          <h4>Options</h4>
          <Form.Group controlId="playbackRate">
            <Form.Label>Playback Speed</Form.Label><br/>
            <ToggleButtonGroup type="radio" name="playbackRate" value={options.playbackRate}
                               onChange={this.handlePlaybackRateChange}>
              <ToggleButton value={1}>Normal</ToggleButton>
              <ToggleButton value={1.25}>1.25x</ToggleButton>
              <ToggleButton value={1.5}>1.5x</ToggleButton>
              <ToggleButton value={1.75}>1.75x</ToggleButton>
              <ToggleButton value={2}>2x</ToggleButton>
            </ToggleButtonGroup>
            <br/>
            <Form.Label>Grades</Form.Label><br/>
            <ToggleButtonGroup type="radio" name="gradeDisplay" value={options.gradeDisplay}
                               onChange={this.handleGradeDisplayChange}>
              <ToggleButton value={"LR"}>Limited Resources</ToggleButton>
              <ToggleButton value={"NZ"}>Nizzahon</ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default Options;