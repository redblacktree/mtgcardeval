import React from 'react';
import './index.css';
import card_back from './images/card_back.png';

class CardImage extends React.Component {
  render() {
    const selectedCard = this.props.selectedCard;

    return (
      selectedCard === undefined || selectedCard === null ?
        <img src={card_back} className="card-image"/>
        :
        <img src={selectedCard.image_url} className="card-image" />
    )
  }
}

export default CardImage;

