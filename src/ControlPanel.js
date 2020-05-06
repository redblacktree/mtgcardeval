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
      set: "IKO",
      selectedColors: new Set(['W', 'U', 'B', 'R', 'G', '']) ,
      filterText: ''
    };

    this.handleSetChange = this.handleSetChange.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
  }

  handleSetChange(set) {
    this.setState({
      set: set
    });
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
        <Col xs={12} md={6} lg={6}>
           <h4>Card List</h4>
          <Search onFilterTextChange={this.handleFilterTextChange} />
          <CardList cards={this.props.cards}
                    set={this.state.set}
                    selectedColors={this.state.selectedColors}
                    filterText={this.state.filterText}
                    selectedCard={this.props.selectedCard}
                    onCardSelect={this.props.onCardSelect}/>
        </Col>
        <Col xs={12} md={6} lg={6}>
          <h4>Options</h4>
          <Options options={this.props.options}
                   onOptionsChange={this.props.onOptionsChange} />

          <Filters onSetChange={this.handleSetChange}
                   onColorSelect={this.handleColorSelect}
                   selectedColors={this.state.selectedColors}/>
        </Col>
      </Row>
    )
  }
}

export default ControlPanel;
