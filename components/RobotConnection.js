import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class RobotConnection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      robotUtils: props.robotUtils,
      robotApp: null,
      pendingEmojiSet: null,
      activeMode: 'idle'
    }
  }

  faceRecognized = (person) => {
    console.log("face recognized", person);
    if(this.props.resetSetIndex) {
      this.props.resetSetIndex();
    }
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
    if(this.props.activeEmojiSet !== emojisNewPerson) {
      this.props.onEmojiCollectionChanged(emojisNewPerson);
      this.setState({
        activeMode: 'personDetected'
      }, () => {
        this.resetEmojiQueue();
        console.log("active emoji set is now", emojisNewPerson);
      });
    }
  };

  sadPerson = (person) => {
    console.log("sad person", person);
    if(this.props.resetSetIndex) {
      this.props.resetSetIndex();
    }
    let emojisSadPerson = 'emojisSadPerson';
    switch(person) {
      case 'David':
        emojisSadPerson = 'emojisSadPerson';
        break;
    }
    if(this.props.activeEmojiSet !== emojisSadPerson) {
      this.props.onEmojiCollectionChanged(emojisSadPerson);
      this.setState({
        activeMode: 'sadPerson'
      }, () => {
        this.resetEmojiQueue();
        console.log("active emoji set is now", emojisSadPerson);
      });
    }
  };

  badAccountBalance = () => {
    console.log("bad account balance");
    if(this.props.resetSetIndex) {
      this.props.resetSetIndex();
    }
    if(this.props.activeEmojiSet !== 'emojisBadAccountBalance') {
      this.props.onEmojiCollectionChanged('emojisBadAccountBalance');
      this.setState({
        activeMode: 'badAccountBalance'
      }, () => {
        this.resetEmojiQueue();
        console.log("active emoji set is now", 'emojisBadAccountBalance');
      });
    }
  };

  calendarReminder = (person) => {
    console.log("calendar reminder", person);
    if(this.props.resetSetIndex) {
      this.props.resetSetIndex();
    }
    let emojisCalendarReminder = 'appointmentEmojis';
    switch(person) {
      case 'Peter':
        emojisCalendarReminder = 'appointmentEmojisPeter';
        break;
      case 'Markus':
        emojisCalendarReminder = 'appointmentEmojisMarkus';
        break;
    }
    if(this.props.activeEmojiSet !== emojisCalendarReminder) {
      this.props.onEmojiCollectionChanged(emojisCalendarReminder);
      this.setState({
        activeMode: 'calendarReminder'
      }, () => {
        this.resetEmojiQueue();
        console.log("active set is now", emojisCalendarReminder);
      });
    }
  };

  targetLost = () => {
    const triggerFromModes = ['calendarReminder', 'sadPerson', 'personDetected'];
    if(triggerFromModes.includes(this.state.activeMode) || true) {
      console.log("face lost");
      if(this.props.resetSetIndex) {
        this.props.resetSetIndex();
      }
      if(this.props.activeEmojiSet !== 'emojisPersonLeaving') {
        this.props.onEmojiCollectionChanged('emojisPersonLeaving');
        this.setState({
          activeMode: 'emojisPersonLeaving'
        }, () => {
          this.resetEmojiQueue(() => {
            const timeout = setTimeout(() => {
              this.setState({
                activeMode: 'emojisIdle'
              });
            }, 6000);
            this.setState({
              pendingEmojiSet: timeout
            }, () => {
              console.log("timeout is set to display ", 'emojisIdle', this.state.pendingEmojiSet);
            });
          });
          console.log("active set is now", 'emojisPersonLeaving');
        });
      }
    }
  };

  resetEmojiQueue = (cb) => {
    console.log("resetting emoji queue");
    if(this.state.pendingEmojiSet) {
      clearTimeout(this.state.pendingEmojiSet);
      this.setState({
        pendingEmojiSet: null
      }, () => {
        if(typeof cb === 'function') {
          console.log("emoji queue cleared");
          cb();
        }
      });
    } else {
      if(typeof cb === 'function') {
        console.log("nothing to clear, call cb");
        cb();
      }
    }
  };

  componentDidMount() {
    window._faceRecognized = this.faceRecognized;
    window._targetLost = this.targetLost;
    window._sadPerson = this.sadPerson;
    window._calendarReminder = this.calendarReminder;
    window._badAccountBalance = this.badAccountBalance;
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