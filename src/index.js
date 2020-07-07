import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';
import CardDetail from "./CardDetail";
import Footer from "./Footer";
import cards_iko from "./data/IKO.json";
import cards_m20 from "./data/M20.json";
import cards_m21 from "./data/M21.json"
import ControlPanel from "./ControlPanel";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {set: "M21", selectedCard: null, options: {playbackRate: 1}};
    this.data = {
      "IKO": cards_iko,
      "M20": cards_m20,
      "M21": cards_m21
    };

    ReactGA.initialize('UA-164496702-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    this.handleSetChange = this.handleSetChange.bind(this);
    this.handleCardSelect = this.handleCardSelect.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleSetChange(set) {
    this.setState({
      set: set
    });
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
    const cards = this.data[this.state.set].cards;
    const showNames = this.data[this.state.set].metadata.show_names;

    return (
      <div className="app">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <h1>MTG Draft Helper</h1>
              <CardDetail options={this.state.options}
                          selectedCard={this.state.selectedCard}
                          showNames={showNames}/>
            </Col>
          </Row>
          <Row className={"border-top"}>
            <Col xs={12}>
              <ControlPanel options={this.state.options}
                            onOptionsChange={this.handleOptionChange}
                            onSetChange={this.handleSetChange}
                            cards={cards}
                            selectedCard={this.state.selectedCard}
                            onCardSelect={this.handleCardSelect}/>
            </Col>
          </Row>
          <Footer/>
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
