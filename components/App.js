import React, { Component } from 'react';
import { RobotConnection } from "./RobotConnection";
import EmojiSequence from "./EmojiSequence";

const emojisIdle = [
  { name: '😀' },
  { name: '☺️' },
  { name: '🤔' },
  { name: '😌' }
];

const emojisParty = [
  { name: '🚀' },
  { name: '🎉' },
  { name: '🍻' },
];

const emojisNewPerson = [
  { name: '👋' },
  { name: '😊' },
  { name: '🤖' },
];

const emojisPersonLeaving = [
  { name: '👋' },
  { name: '😥' },
  { path: 'img/sad_pepe.png' },
];

const appointmentEmojis = [
  { name: '📅' },
  { name: '☝️' }
];

const emojisCollection = {
  emojisIdle: emojisIdle,
  emojisParty: emojisParty,
  emojisNewPerson: emojisNewPerson,
  emojisPersonLeaving: emojisPersonLeaving,
  appointmentEmojis: appointmentEmojis
};

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
          <EmojiSequence emojiCollection={emojisCollection} />
        </div>
      </RobotConnection>
    );
  }
};