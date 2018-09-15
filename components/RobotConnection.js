import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class RobotConnection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      robotUtils: props.robotUtils,
      robotApp: null,
      activeEmojiSet: 'emojisIdle',
      pendingEmojiSet: null
    }
  }

  faceRecognized = (person) => {
    console.log("face recognized", person);
    let emojisNewPerson = 'emojisNewPerson';
    switch(person) {
      case 'David':
        emojisNewPerson = 'emojisNewPersonDavid';
        break;
      case 'Peter':
        emojisNewPerson = 'emojisNewPersonPeter';
        break;
      case 'Markus':
        emojisNewPerson = 'emojisNewPersonMarkus';
        break;
    }
    this.setState({
      activeEmojiSet: emojisNewPerson
    }, () => {
      this.resetEmojiQueue();
      console.log("active emoji set is now", emojisNewPerson);
    });
  };

  sadPerson = (person) => {
    console.log("sad person", person);
    let emojisSadPerson = 'emojiSadPerson';
    switch(person) {
      case 'David':
        emojisSadPerson = 'emojiSadPerson';
        break;
    }
    this.setState({
      activeEmojiSet: emojisSadPerson
    }, () => {
      this.resetEmojiQueue();
      console.log("active emoji set is now", emojisSadPerson);
    });
  };

  calendarReminder = (person) => {
    console.log("calendar reminder", person);
    let emojisCalendarReminder = 'appointmentEmojis';
    switch(person) {
      case 'Peter':
        emojisCalendarReminder = 'appointmentEmojisPeter';
        break;
      case 'Markus':
        emojisCalendarReminder = 'appointmentEmojisMarkus';
        break;
    }
    this.setState({
      activeEmojiSet: emojisCalendarReminder
    }, () => {
      this.resetEmojiQueue();
      console.log("active set is now", emojisCalendarReminder);
    });
  };

  targetLost = () => {
    console.log("face lost");
    this.setState({
      activeEmojiSet: 'emojisPersonLeaving'
    }, () => {
      this.resetEmojiQueue(() => {
        const timeout = setTimeout(() => {
          this.setState({
            activeEmojiSet: 'emojisIdle'
          });
        }, 6000);
        this.setState({
          pendingEmojiSet: timeout
        });
      });
      console.log("active set is now", 'emojisPersonLeaving');
    });
  };

  resetEmojiQueue = (cb) => {
    console.log("resetting emoji queue");
    if(this.state.pendingEmojiSet) {
      clearTimeout(this.state.pendingEmojiSet);
      this.setState({
        pendingEmojiSet: null
      }, () => {
        if(typeof cb === 'function') {
          cb();
        }
      });
    }
  };

  componentDidMount() {
    window._faceRecognized = this.faceRecognized;
    window._targetLost = this.targetLost;
    window._sadPerson = this.sadPerson;
    window._calendarReminder = this.calendarReminder;
    const robotApp = this.state.robotUtils();
    this.setState({
      robotApp: robotApp
    });
  }

  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}

const withRobotConnection = (Component) => {
  return (props) => (
    <Consumer>
      {(robotConnectionState) => (<Component {...props} robotConnection={robotConnectionState} />)}
    </Consumer>
  );

};

export default withRobotConnection;
export { RobotConnection };