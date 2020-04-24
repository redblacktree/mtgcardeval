import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './index.css';
import Filters from './Filters';
import CardListItem from './CardListItem'
import { intersection } from './utils'

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedColors: new Set(['W', 'U', 'B', 'R', 'G']) , filterText: ''};

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
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

  render() {
    const cards = this.props.cards;
    const noIncompleteCards = cards.filter(card => card.start !== 0);
    const filterByColor = noIncompleteCards.filter(card => intersection(this.state.selectedColors, new Set(card.color.split(''))).size > 0);
    const filteredCards = filterByColor.filter(card => card.name.toLowerCase().startsWith(this.state.filterText.toLowerCase()));
    const selectedCard = this.props.selectedCard;
    const onCardSelect = this.props.onCardSelect;
    console.log('handleColorSelect', this.handleColorSelect);

    return (
      <React.Fragment>
        <Filters selectedColors={this.state.selectedColors}
                 filterText={this.state.filterText}
                 onFilterTextChange={this.handleFilterTextChange}
                 onColorSelect={this.handleColorSelect}/>
        <ListGroup>
          {filteredCards.map(card => (
            <CardListItem card={card}
                          key={card.name}
                          onCardSelect={onCardSelect}
                          selectedCard={selectedCard}/>
          ))}
        </ListGroup>
      </React.Fragment>
    )
  }
}

export default CardList;