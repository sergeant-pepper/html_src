import React, { Component } from 'react';
import Emoji from './Emoji';
import withRobotConnection from "./RobotConnection";

class EmojiSequence extends Component {

  static defaultProps = {
    intervalTime: 4000,
    emojiCollection: {}
  };

  static getDerivedStateFromProps(props, state) {
    if (props.robotConnection.activeEmojiSet.length < state.currentEmojiIndex) {
      return {
        currentEmojiIndex: 0
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      currentEmojiIndex: 0
    }
    console.log('current emojis set', this.props.robotConnection);
  }

  nextEmoji = () => {
    const emojiIndex = this.state.currentEmojiIndex >= this.props.emojiCollection[this.props.robotConnection.activeEmojiSet].length - 1 ? 0 : this.state.currentEmojiIndex + 1;
    this.setState({
      currentEmojiIndex: emojiIndex
    });
  };

  componentDidMount() {
    this.setNewInterval();
  }

  setNewInterval() {
    if(this.state.interval) {
      clearInterval(this.state.interval);
    }
    this.setState({
      interval: setInterval(this.nextEmoji, this.props.intervalTime)
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.robotConnection.activeEmojiSet !== prevProps.robotConnection.activeEmojiSet) {
      this.setState({
        currentEmojiIndex: 0
      }, () => {
        this.setNewInterval();
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render () {
    const currentEmoji = this.props.emojiCollection[this.props.robotConnection.activeEmojiSet][this.state.currentEmojiIndex];
    return (
      <Emoji path={currentEmoji.path} svg name={currentEmoji.name} />
    );
  }
}

export default withRobotConnection(EmojiSequence);