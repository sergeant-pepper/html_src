import React, { Component } from 'react';
import { RobotConnection } from "./RobotConnection";
import EmojiSequence from "./EmojiSequence";

const emojisMock = [
  { name: '😀' },
  { name: '☺️' },
  { name: '🤔' },
  { name: '😌' }
];

export default class App extends Component {

  static defaultProps = {
    qiSession: null,
    qiHost: 'localhost'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RobotConnection robotUtils={this.props.robotUtils}>
        <div className={'content'}>
          <EmojiSequence emojis={emojisMock} />
        </div>
      </RobotConnection>
    );
  }
};