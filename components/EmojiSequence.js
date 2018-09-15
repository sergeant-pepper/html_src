import React, { Component } from 'react';
import Emoji from './Emoji';
import withRobotConnection from "./RobotConnection";

class EmojiSequence extends Component {

  static defaultProps = {
    intervalTime: 2000,
    emojiCollection: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      currentEmojiIndex: 0
    };
  }

  nextEmoji = () => {
    const emojiIndex = this.state.currentEmojiIndex >= this.props.emojiCollection[this.props.robotConnection.activeEmojiSet].length - 1 ? 0 : this.state.currentEmojiIndex + 1;
    console.log("set emoji index to", emojiIndex);
    this.setState({
      currentEmojiIndex: emojiIndex
    }, () => {
      console.log("emoji index is set", this.state.currentEmojiIndex);
    });
  };

  componentDidMount() {
    this.setNewInterval();
  }

  setNewInterval() {
    if(this.state.interval) {
      console.log("reset interval");
      clearInterval(this.state.interval);
    }
    this.setState({
      interval: setInterval(this.nextEmoji, this.props.intervalTime)
    });
  }

  clearInterval(cb) {
    clearInterval(this.state.interval);
    this.setState({
      interval: null
    }, () => {
      if(typeof cb === 'function') {
        cb();
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.robotConnection.activeEmojiSet !== prevProps.robotConnection.activeEmojiSet) {
      this.clearInterval(() => {
        this.setState({
          currentEmojiIndex: 0
        }, () => {
          console.log("emoji set updated, reset interval");
          this.setNewInterval();
        });
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render () {
    let emojiSet = [];
    if(this.props.robotConnection && this.props.robotConnection.activeEmojiSet) {
      emojiSet = this.props.emojiCollection[this.props.robotConnection.activeEmojiSet];
      console.log("emojiSet found", emojiSet);
    }
    console.log("using set", emojiSet[this.state.currentEmojiIndex]);
    if(emojiSet && emojiSet[this.state.currentEmojiIndex]) {
      const currentEmoji = emojiSet[this.state.currentEmojiIndex];
      return (
        <Emoji path={currentEmoji.path} svg name={currentEmoji.name} />
      );
    } else {
      return (<span>test</span>);
    }
  }
}

export default withRobotConnection(EmojiSequence);