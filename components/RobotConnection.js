import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class RobotConnection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      robotUtils: props.robotUtils,
      session: null,
      ALMemory: null,
    }
  }

  onRobotConnectionSuccessful = (session) => {
    console.log('got session', session);
    this.setState({
      session: session
    });
  };

  onRobotConnectionFailed = () => {
    console.log("Failed to connect to robot!");
  };

  subscribeToALMemoryEvent = (event, eventCallback, subscribeDoneCallback) => {
    const evt = new this.state.robotUtils.MemoryEventSubscription(event);
    self.onServices((ALMemory) => {
      ALMemory.subscriber(event).then((sub) => {
        evt.setSubscriber(sub);
        sub.signal.connect(eventCallback).then((id) => {
          evt.setId(id);
          if (subscribeDoneCallback) subscribeDoneCallback(id);
        });
      },
      this.state.robotUtils.onALMemoryError);
    });
    return evt;
  };

  componentDidMount() {
    RobotUtils.connect(this.onRobotConnectionSuccessful, this.onRobotConnectionFailed);
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
      {(robotConnectionState) => {
        return (
          <Component {...props} robotConnection={robotConnectionState} />
        );
      }}
    </Consumer>
  );

};

export default withRobotConnection;
export { RobotConnection };