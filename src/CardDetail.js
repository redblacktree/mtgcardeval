import React from 'react';
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import card_back from './images/card_back.png'
import CardImage from "./CardImage";

class CardDetail extends React.Component {
  constructor(props){
    super(props);
    this.onPlayerReady = this.onPlayerReady.bind(this);
  }

  onPlayerReady(event) {
    const autoplay = this.props.options.autoplay;
    const selectedCard = this.props.selectedCard;
    const start = selectedCard && selectedCard.clips[0].start;
    const stop = selectedCard && selectedCard.clips[0].stop;
    const videoId = selectedCard && selectedCard.clips[0].videoId;

    const options = {videoId:videoId,
        startSeconds:start,
        endSeconds:stop};
      if (autoplay) {
        this.player.loadVideoById(options);
      }
      else {
        this.player.cueVideoById(options);
      }

    this.playerReady = true;
  }

  onPlayerStateChange(event) {
    // Not needed for now, but I'm keeping the boilerplate here
    // for when I eventually do
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    const autoplay = this.props.options.autoplay;
    const playbackRate = this.props.options.playbackRate;
    const selectedCard = this.props.selectedCard;
    const start = selectedCard && selectedCard.clips[0].start;
    const stop = selectedCard && selectedCard.clips[0].stop;
    const videoId = selectedCard && selectedCard.clips[0].videoId;

    if (this.playerReady && prevProps.selectedCard !== this.props.selectedCard) {
      const options = {videoId:videoId,
        startSeconds:start,
        endSeconds:stop};
      if (autoplay) {
        this.player.loadVideoById(options);
      }
      else {
        this.player.cueVideoById(options);
      }
    }

    if (window.YouTubeIframeAPIReady && this.player === undefined) {
      this.player = new window.YT.Player('player', {
        width: "100%",
        height: "auto",
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      });
    }
  };

  render() {
    const selectedCard = this.props.selectedCard;

    return (
      selectedCard === null ?
        <Row>
          <Col xs={12} md={6} lg={6}>
            <h3>What is this?</h3>
            <p> This
              is a collection of discussions about Magic: The Gathering cards, made to be quickly accessible. The discussion comes from
              the podcast "Limited Resources" with Marshall Sutcliffe and Luis Scott-Vargas. Thank you Marshall and Luis!</p>
            <h3>Why?</h3>
            <p>During an MTG draft, particularly online against humans, you may need some quick advice on a pick. Having made a few spreadsheets for my own use with time-coded links to Limited Resources YouTube videos,
              I decided to share the last one, and it got a good reception on reddit. Since people seemed to get some
              value out of it, I decided to see if I could quickly whip up an app to make the filtering/searching a bit
              easier, and this is the result!</p>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <h3>How to Use</h3>
            <p>Below is a list of cards for a set. When you click a card, the video of the discussion about that
              card will appear here. If you have "Autoplay Videos" selected, it will play immediately. There are
              currently two sets available: Ikoria and Core Set 2020; Ikoria is loaded by default, since it's the latest
              set.</p>
            <h3>Issues?</h3>
            <p><a href="https://github.com/redblacktree/mtgcardeval/issues">Report issues here</a>, including issues with start and stop
            times of videos. I collect that data manually, so there are bound to be some mistakes.</p>
          </Col>
        </Row>
        :
        <Row>
          <Col xs={12} md={6}>
            <CardImage />
          </Col>
          <Col xs={12} md={6}>
            <h3>Video Name (set review/re-review/sunset/etc</h3>
            <div className="video">
              <div id="player"></div>
            </div>
          </Col>
        </Row>
    )
  }
}

export default CardDetail;

