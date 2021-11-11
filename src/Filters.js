import React from 'react';
import './index.css';
import Form from 'react-bootstrap/Form';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetChange = this.handleSetChange.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
  }

  handleSetChange(e) {
    this.props.onSetChange(e.target.value);
  }

  handleColorSelect(e) {
    this.props.onColorSelect(e.target.id, e.target.checked);
  }

  render() {
    const selectedColors = this.props.selectedColors;
    const filterText = this.props.filterText;

    return (
      <div className="panel panel-default">
        <Form className="panel-body">
          <h4>Filters</h4>
          <Form.Group controlId="set">
            <Form.Label>Set</Form.Label>
            <Form.Control as="select" onChange={this.handleSetChange}>
              <option value="VOW">Innistrad: Crimson Vow</option>
              <option value="AFR">Adventures in the Forgotten Realms</option>
              <option value="STX">Strixhaven</option>
              <option value="KHM">Kaldheim</option>
              <option value="ZNR">Zendikar Rising</option>
              <option value="M21">Core Set 2021</option>
              <option value="IKO">Ikoria</option>
              <option value="M20">Core Set 2020</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Color</Form.Label><br/>
            <Form.Check label="White" id="W" checked={selectedColors.has("W")} onChange={this.handleColorSelect} inline/>
            <Form.Check label="Blue" id="U" checked={selectedColors.has("U")} onChange={this.handleColorSelect} inline/>
            <Form.Check label="Black" id="B" checked={selectedColors.has("B")} onChange={this.handleColorSelect} inline/>
            <Form.Check label="Red" id="R" checked={selectedColors.has("R")} onChange={this.handleColorSelect} inline/>
            <Form.Check label="Green" id="G" checked={selectedColors.has("G")} onChange={this.handleColorSelect} inline/>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default Filters;