import React from 'react';
import './index.css';
import Form from 'react-bootstrap/Form';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    const filterText = this.props.filterText;

    return (
      <Form>
        <Form.Group controlId="cardName">
          <Form.Label>Filter</Form.Label>
          <Form.Control type="text" placeholder="Card Name..." value={filterText} onChange={this.handleFilterTextChange}>
          </Form.Control>
        </Form.Group>
      </Form>
    )
  }
}

export default Search;