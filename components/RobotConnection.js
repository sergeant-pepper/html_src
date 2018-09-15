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

  faceRecognized = (face) => {
    console.log("face recognized", face);
    this.setState({
      activeEmojiSet: 'emojisNewPerson'
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