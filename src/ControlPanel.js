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
import Filters from "./Filters";
import Search from "./Search";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColors: new Set(['W', 'U', 'B', 'R', 'G', '']) ,
      filterText: ''
    };

    this.handleColorSelect = this.handleColorSelect.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleColorSelect(color, checked) {
    if (checked) {
      this.state.selectedColors.add(color);
      this.setState({
        selectedColors: new Set(this.state.selectedColors.values())
      });
    }
    else {
      this.state.selectedColors.delete(color);
      this.setState({
        selectedColors: new Set(this.state.selectedColors.values())
      });
    }
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={6} lg={4} xl={4}>
          <Search onFilterTextChange={this.handleFilterTextChange}/>
          <CardList cards={this.props.cards}
                    selectedColors={this.state.selectedColors}
                    options={this.props.options}
                    filterText={this.state.filterText}
                    selectedCard={this.props.selectedCard}
                    onCardSelect={this.props.onCardSelect}/>
        </Col>
        <Col xs={12} md={6} lg={4} xl={4}>
          <Options options={this.props.options}
                   onOptionsChange={this.props.onOptionsChange}/>

          <Filters onSetChange={this.props.onSetChange}
                   onColorSelect={this.handleColorSelect}
                   selectedColors={this.state.selectedColors}/>
        </Col>
      </Row>
    )
  }
}

export default ControlPanel;
