import React from 'react';
import './index.css';

class CardImage extends React.Component {
  render() {
    const selectedCard = this.props.selectedCard;

    return (
      selectedCard === null ?
        <img src="./images/card_back.png"/>
        :
        <img src="./images/card_back.png"/>
    )
  }
}

export default CardImage;

