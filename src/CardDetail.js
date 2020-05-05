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
          <Col xs={12} md={9} lg={7}>
            <h3>What is this?</h3>
            <p> This
              is a collection of discussions about Magic: The Gathering cards, made to be quickly accessible. The discussion comes from
              the podcast "Limited Resources" with Marshall Sutcliffe and Luis Scott-Vargas. Thank you Marshall and Luis!</p>
            <h3>Why?</h3>
            <p>During an MTG draft, particularly online against humans, you may need some quick advice on a pick. Having made a few spreadsheets for my own use with time-coded links to Limited Resources YouTube videos,
              I decided to share the last one, and it got a good reception on reddit. Since people seemed to get some
              value out of it, I decided to see if I could quickly whip up an app to make the filtering/searching a bit
              easier, and this is the result!</p>
            <h3>How to Use</h3>
            <p>On the left is a list of cards for a set. When you click a card, the video of the discussion about that
              card will appear on the right. If you have "Autoplay Videos" selected, it will play immediately. There are
              currently two sets available: Ikoria and Core Set 2020; Ikoria is loaded by default, since it's the latest
              set.</p>
            <h3>Issues?</h3>
            <p><a href="https://github.com/redblacktree/mtgcardeval/issues">Report issues here</a>, including issues with start and stop
            times of videos. I collect that data manually, so there are bound to be some mistakes.</p>
          </Col>
        </Row>
        :
        <Row>
          <Col xs={12}>
            <h3>{selectedCard.name}</h3>
            <div className="video">
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

