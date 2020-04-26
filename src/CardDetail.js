import React from 'react';
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import card_back from './images/card_back.png'

class CardDetail extends React.Component {
  render() {
    const selectedCard = this.props.selectedCard;
    const start = selectedCard && selectedCard.start;
    const stop = selectedCard && selectedCard.stop;
    const autoplay = this.props.options.autoplay ? 1 : 0;
    const url = selectedCard && selectedCard.link.split('&')[0].replace('/watch?v=', '/embed/');
    const src = `${url}?start=${start}&end=${stop}&autoplay=${autoplay}`;

    return (
      selectedCard === null ?
        <Row>
          <Col xs={12}>
            <h2>Select a Card to Hear the Conversation</h2>
            <img src={card_back} style={{margin: "50px"}}/>
          </Col>
        </Row>
        :
        <Row>
          <Col xs={12}>
            <h2>The Conversation</h2>
            <div class="video">
              <iframe title={selectedCard.name}
                      width="100%" height="auto" src={src}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen></iframe>
            </div>
          </Col>
        </Row>
    )
  }
}

export default CardDetail;

