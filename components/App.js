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

const emojisSadPerson = [
  { name: '🤔' },
  { name: '💡' },
  { path: 'img/party_parrot.gif' },
  { path: 'img/party_parrot.gif' },
  { path: 'img/party_parrot.gif' },
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
  emojisSadPerson: emojisSadPerson
};

export default class App extends Component {

  static defaultProps = {
    qiSession: null,
    qiHost: 'localhost'
  };

  constructor(props) {
    super(props);
    this.state = {
      setIndex: 0,
      currentEmojiCollection: 'emojisIdle'
    }
  }

  resetSetIndex = () => {
    this.setState({
      setIndex: 0
    })
  };

  updateSetIndex = (index) => {
    this.setState({
      setIndex: index
    })
  };

  updateCurrentEmojiCollection = (emojiCollection) => {
    this.setState({
      currentEmojiCollection: emojiCollection
    })
  };

  render() {
    //const currentEmoji = emojisCollection[this.state.currentEmojiCollection][this.state.setIndex].name;
    return (
      <RobotConnection activeEmojiSet={this.state.currentEmojiCollection} robotUtils={this.props.robotUtils} resetSetIndex={this.resetSetIndex} onEmojiCollectionChanged={this.updateCurrentEmojiCollection}>
        <div className={'content'}>
          <EmojiSequence onModeChange={this.updateCurrentEmojiCollection} emojiCollection={emojisCollection} setIndex={this.state.setIndex} updateSetIndex={this.updateSetIndex} activeEmojiSet={this.state.currentEmojiCollection} />
        </div>
      </RobotConnection>
    );
  }
};