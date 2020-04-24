import React from 'react';
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CardDetail extends React.Component {
  render() {
    const selectedCard = this.props.selectedCard;
    const start = selectedCard && selectedCard.start;
    const stop = selectedCard && selectedCard.stop;
    const autoplay = this.props.options.autoplay ? 1 : 0;
    const src = `https://www.youtube.com/embed/w0nzu-99Bs8?start=${start}&end=${stop}&autoplay=${autoplay}`;

    return (
      selectedCard === null ?
        <h2>Select a Card on the left</h2> :
      <Row>
        <Col xs={12}>
          <iframe title={selectedCard.name}
                  width="560" height="315" src={src}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
        </Col>
      </Row>
    )
  }
}

export default CardDetail;

