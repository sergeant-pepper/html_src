import React, { Component } from 'react';
import Emoji from './Emoji';
import withRobotConnection from "./RobotConnection";

class EmojiSequence extends Component {

  static defaultProps = {
    intervalTime: 3000,
    emojis: []
  };

  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      currentEmojiIndex: 0
    }
  }

  nextEmoji = () => {
    const emojiIndex = this.state.currentEmojiIndex >= this.props.emojis.length - 1 ? 0 : this.state.currentEmojiIndex + 1;
    this.setState({
      currentEmojiIndex: emojiIndex
    });
  };

  componentDidMount() {
    this.setState({
      interval: setInterval(this.nextEmoji, this.props.intervalTime)
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render () {
    const currentEmoji = this.props.emojis[this.state.currentEmojiIndex];
    return (
      <Emoji path={currentEmoji.path} svg name={currentEmoji.name} />
    );
  }
}

export default withRobotConnection(EmojiSequence);