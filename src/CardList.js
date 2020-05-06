import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './index.css';
import Filters from './Filters';
import CardListItem from './CardListItem'
import { intersection } from './utils'


class CardList extends React.Component {
  constructor(props) {
    super(props);
  }

  static colorFilter(selectedColors, card) {
    const cardColors = new Set(card.color.split(''));
    if (card.color === '') {
      return true;
    }
    return intersection(selectedColors, cardColors).size > 0;
  }

  render() {
    const cards = this.props.cards[this.props.set];
    const noIncompleteCards = cards.filter(card => card.start !== 0);
    const filterByColor = noIncompleteCards.filter(card => CardList.colorFilter(this.props.selectedColors, card));
    const filteredCards = filterByColor.filter(card => card.name.toLowerCase().startsWith(this.props.filterText.toLowerCase()));

    return (
      <ListGroup>
        {filteredCards.map(card => (
          <CardListItem card={card}
                        key={card.name}
                        onCardSelect={this.props.onCardSelect}
                        selectedCard={this.props.selectedCard}/>
        ))}
      </ListGroup>
    )
  }
}

export default CardList;