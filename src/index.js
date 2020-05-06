import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';
import Header from './Header';
import CardList from './CardList';
import CardDetail from "./CardDetail";
import Options from "./Options";
import Footer from "./Footer";
import cards_iko from "./data/IKO.json";
import cards_m20 from "./data/M20.json";
import ControlPanel from "./ControlPanel";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedCard: null, options: {autoplay: false, playbackRate: 1}};

    ReactGA.initialize('UA-164496702-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

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
          <Row>
            <h1>MTG Draft Helper</h1>
            <Col xs={12}>
              <CardDetail options={this.state.options}
                          selectedCard={this.state.selectedCard}/>
            </Col>
          </Row>
          <Row className={"border-top"}>
            <Col xs={12}>
              <ControlPanel options={this.state.options}
                            onOptionsChange={this.handleOptionChange}
                            cards={{
                              "IKO": cards_iko,
                              "M20": cards_m20
                            }}
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
