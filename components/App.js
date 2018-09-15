import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emoji: 'img/banana_parrot.gif'
    };
  }

  render() {
    const { emoji } = this.state;
    return (
      <img src={emoji} alt="emoji" />
    );
  }
};