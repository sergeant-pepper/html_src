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
    };
  }

  nextEmoji = () => {
    const emojiIndex = this.props.setIndex >= this.props.emojiCollection[this.props.robotConnection.activeEmojiSet].length - 1 ? 0 : this.props.setIndex + 1;
    console.log("update emoji index to", emojiIndex);
    this.props.updateSetIndex(emojiIndex);
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
    console.log("using set", emojiSet[this.props.setIndex]);
    if(emojiSet && emojiSet[this.props.setIndex]) {
      const currentEmoji = emojiSet[this.props.setIndex];
      return (
        <Emoji path={currentEmoji.path} svg name={currentEmoji.name} />
      );
    } else {
      return (<span>test</span>);
    }
  }
}

export default withRobotConnection(EmojiSequence);