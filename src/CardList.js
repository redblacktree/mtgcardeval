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
    const cards = this.props.cards;
    const noIncompleteCards = cards.filter(card => card.clips !== undefined);
    const filterByColor = noIncompleteCards.filter(card => CardList.colorFilter(this.props.selectedColors, card));
    const filteredCards = filterByColor.filter(card => card.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) >= 0);

    return (
      <ListGroup>
        {filteredCards.map(card => (
          <CardListItem card={card}
                        key={card.name}
                        options={this.props.options}
                        onCardSelect={this.props.onCardSelect}
                        selectedCard={this.props.selectedCard}/>
        ))}
      </ListGroup>
    )
  }
}

export default CardList;