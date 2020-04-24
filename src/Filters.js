import React from 'react';
import './index.css';
import Form from 'react-bootstrap/Form';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
    console.log(props.onColorSelect);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleColorSelect(e) {
    this.props.onColorSelect(e.target.id, e.target.checked);
  }

  render() {
    const selectedColors = this.props.selectedColors;
    const filterText = this.props.filterText;

    return (
      <Form>
        <Form.Group controlId="set">
          <Form.Label>Set</Form.Label>
          <Form.Control as="select">
            <option>Ikoria</option>
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
        <Form.Group controlId="cardName">
          <Form.Label>Filter</Form.Label>
          <Form.Control type="text" placeholder="Card Name..." value={filterText} onChange={this.handleFilterTextChange}>
          </Form.Control>
        </Form.Group>
      </Form>
    )
  }
}

export default Filters;