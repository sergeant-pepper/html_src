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
  { path: '🤖' },
  { name: '😊' },
];

const emojisNewPersonDavid = [
  { name: '👋' },
  { path: 'img/David.png' },
  { name: '😊' },
];

const emojisNewPersonPeter = [
  { name: '👋' },
  { path: 'img/Peter.png' },
  { name: '😊' },
];

const emojisNewPersonMarkus = [
  { name: '👋' },
  { path: 'img/Markus.png' },
  { name: '😊' },
];

const emojisPersonLeaving = [
  { name: '👋' },
  { name: '😥' },
  { path: 'img/sad_pepe.png' },
];

const emojiSadPerson = [
  { name: '🤔' },
  { name: '💡' },
  { path: 'img/party_parrot.gif' }
];

const appointmentEmojis = [
  { name: '📅' },
  { name: '☝️' }
];

const appointmentEmojisPeter = [
  { name: '📅' },
  { path: 'img/calendar/Peter.png' },
  //{ name: '☝️' }
];

const appointmentEmojisMarkus = [
  { name: '📅' },
  { path: 'img/calendar/Markus.png' },
  //{ name: '☝️' }
];

const emojisCollection = {
  emojisIdle: emojisIdle,
  emojisParty: emojisParty,
  emojisNewPerson: emojisNewPerson,
  emojisNewPersonDavid: emojisNewPersonDavid,
  emojisNewPersonPeter: emojisNewPersonPeter,
  emojisNewPersonMarkus: emojisNewPersonMarkus,
  emojisPersonLeaving: emojisPersonLeaving,
  appointmentEmojis: appointmentEmojis,
  appointmentEmojisPeter: appointmentEmojisPeter,
  appointmentEmojisMarkus: appointmentEmojisMarkus,
  emojiSadPerson: emojiSadPerson
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