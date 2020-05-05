import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './index.css';
import Filters from './Filters';
import CardListItem from './CardListItem'
import { intersection } from './utils'


class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      set: "IKO",
      selectedColors: new Set(['W', 'U', 'B', 'R', 'G', '']) ,
      filterText: ''
    };

    this.handleSetChange = this.handleSetChange.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
  }

  handleSetChange(set) {
    this.setState({
      set: set
    });
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

  static colorFilter(selectedColors, card) {
    const cardColors = new Set(card.color.split(''));
    if (card.color === '') {
      return true;
    }
    return intersection(selectedColors, cardColors).size > 0;
  }

  render() {
    const cards = this.props.cards[this.state.set];
    const noIncompleteCards = cards.filter(card => card.start !== 0);
    const filterByColor = noIncompleteCards.filter(card => CardList.colorFilter(this.state.selectedColors, card));
    const filteredCards = filterByColor.filter(card => card.name.toLowerCase().startsWith(this.state.filterText.toLowerCase()));
    const selectedCard = this.props.selectedCard;
    const onCardSelect = this.props.onCardSelect;
    console.log('handleColorSelect', this.handleColorSelect);

    return (
      <React.Fragment>
        <Filters selectedColors={this.state.selectedColors}
                 filterText={this.state.filterText}
                 onSetChange={this.handleSetChange}
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