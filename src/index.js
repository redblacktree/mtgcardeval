import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';
import Header from './Header';
import CardList from './CardList';
import CardDetail from "./CardDetail";
import Options from "./Options";
import ikoria from "./data/ikoria.json"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedCard: null, options: {autoplay: false}};
    this.handleCardSelect = this.handleCardSelect.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleCardSelect(card) {
    this.setState({
      selectedCard: card
    });
  }

  handleOptionChange(options) {
    this.setState({
      options: options
    });
  }

  render() {
    return (
      <div className="app">
        <Container fluid>
          <Header />
          <Row>
            <Col xs={3}>
              <Options options={this.state.options}
                       onOptionsChange={this.handleOptionChange}/>
              <CardList cards={ikoria}
                        selectedCard={this.state.selectedCard}
                        onCardSelect={this.handleCardSelect}/>
            </Col>
            <Col xs={9}>
              <CardDetail options={this.state.options}
                          selectedCard={this.state.selectedCard}/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
