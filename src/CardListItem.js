import React from 'react';
import ReactGA from 'react-ga';
import ListGroup from 'react-bootstrap/ListGroup';
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CardListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleCardSelect = this.handleCardSelect.bind(this);
  }

  handleCardSelect(e) {
    ReactGA.event({
      category: 'Card List',
      action: 'Clicked Card',
      label: this.props.card.name
    });
    this.props.onCardSelect(this.props.card);
  }

  render() {
    const card = this.props.card;
    const selectedCard = this.props.selectedCard;

    return (
      <ListGroup.Item active={selectedCard !== null && selectedCard.name === card.name}
                      onClick={this.handleCardSelect}>
        <Row>
          <Col xs={9}>{card.name}</Col>
          <Col xs={3}>{card.grade}</Col>
        </Row>
      </ListGroup.Item>
    )
  }
}

export default CardListItem;