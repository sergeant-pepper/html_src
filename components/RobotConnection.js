import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class RobotConnection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      robotUtils: props.robotUtils,
      robotApp: null,
      activeEmojiSet: 'emojisIdle'
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
    });
  };

  targetLost = () => {
    console.log("face lost");
    this.setState({
      activeEmojiSet: 'emojisPersonLeaving'
    }, () => {
      setTimeout(() => {
        this.setState({
          activeEmojiSet: 'emojisIdle'
        });
      }, 12000);
    });
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