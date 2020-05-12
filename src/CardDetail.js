import React from 'react';
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import card_back from './images/card_back.png'
import CardImage from "./CardImage";
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import CardListItem from "./CardList";
import Form from "react-bootstrap/Form";
import call_to_action from "./images/call_to_action.svg"

class CardDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {'clipIndex': 0};

    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.handleChangeClip = this.handleChangeClip.bind(this);
  }

  handleChangeClip(value) {
    this.setState({'clipIndex': value})
  }

  onPlayerReady(event) {
    console.log('onPlayerReady');
    const selectedCard = this.props.selectedCard;

    if (selectedCard) {
      const start = selectedCard.clips[0].start;
      const stop = selectedCard.clips[0].stop;
      const videoId = selectedCard.clips[0].videoId;

      const options = {
        videoId: videoId,
        startSeconds: start,
        endSeconds: stop
      };
      this.player.loadVideoById(options);
    }

    this.playerReady = true;
  }

  onPlayerStateChange(event) {
    const state = event.data;
    if (state === 0) { // state 0 == ENDED
      const selectedCard = this.props.selectedCard;
      if (selectedCard
          && selectedCard.clips.length > this.state.clipIndex + 1
          // The comparison below is somewhat loose, because YouTube returns a
          // floating point number, and I'm not confident that it will always be
          // greater than the defined stop time when an ENDED event is fired
          && event.target.getCurrentTime() > selectedCard.clips[this.state.clipIndex].stop - 1) {
        this.setState({clipIndex: this.state.clipIndex + 1});
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    console.log(this.player);

    const selectedCard = this.props.selectedCard;
    let clipIndex = this.state.clipIndex;
    // Reset clipIndex to 0 when the card changes
    if (prevProps.selectedCard !== this.props.selectedCard) {
      clipIndex = 0;
      this.setState({'clipIndex': 0});
    }
    const start = selectedCard && selectedCard.clips[clipIndex].start;
    const stop = selectedCard && selectedCard.clips[clipIndex].stop;
    const videoId = selectedCard && selectedCard.clips[clipIndex].videoId;

    if (this.playerReady
        && prevProps.options.playbackRate !== this.props.options.playbackRate) {
      this.player.setPlaybackRate(this.props.options.playbackRate);
    }

    if (this.playerReady
        && (prevProps.selectedCard !== this.props.selectedCard
            || prevProps.clipIndex !== this.state.clipIndex))
    {
      const options = {
        videoId:videoId,
        startSeconds:start,
        endSeconds:stop
      };
      this.player.loadVideoById(options);
    }

    if (window.YouTubeIframeAPIReady && this.player === undefined) {
      console.log('initializing player');
      this.player = new window.YT.Player('player', {
        width: "100%",
        height: "auto",
        videoId: "w0nzu-99Bs8",
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
       <React.Fragment>
        <Row className={selectedCard !== null ? "hidden": ""}>
          <div>
            <CardImage selectedCard={selectedCard} />
          </div>
          <div className="hero">
            <h3>Pro Opinions.</h3>
            <h3>Fast Enough for Human Draft.</h3>
            <h3>Click a card name to get started.</h3>
            <img className="call-to-action" src={call_to_action} />
          </div>
        </Row>

        <Row className={selectedCard === null ? "hidden": ""}>
          <Col xs={12} md={6} lg={4} xl={4}>
            <CardImage selectedCard={selectedCard} />
          </Col>
          <Col xs={12} md={6} lg={6} xl={6} className="video-container">
            <div className="mentions">
              <Form>
                <Form.Group>
                  <ToggleButtonGroup type="radio" name="clipIndex" value={this.state.clipIndex}
                                     onChange={this.handleChangeClip} className="btn-group-justified">
                    {selectedCard && selectedCard.clips.map(clip => (
                      <ToggleButton key={selectedCard.clips.indexOf(clip)}
                                    value={selectedCard.clips.indexOf(clip)}>
                        {this.props.showNames[clip.videoId]}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Form.Group>
              </Form>
            </div>
            <div className="video">
              <div id="player"></div>
            </div>
          </Col>
        </Row>
       </React.Fragment>
    )
  }
}

export default CardDetail;

