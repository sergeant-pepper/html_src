import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './global.css';

var application = function(){


  /*QiSession Events*/
  var onConnected = function (session) {
    log('connected');
    session.service('ALMemory').then(function (serv) {
        ALMemory = serv;
      },
      function (error) {
        log('Unable to get the service ALMemory: ' + error);
      });
    RobotUtils.subscribeToALMemoryEvent('template/changeBGColor', changeBGColor);
    RobotUtils.subscribeToALMemoryEvent('FACE_RECOGNIZED', faceRecognized);
    RobotUtils.subscribeToALMemoryEvent('ALTracker/TargetLost', targetLost);
  };

  var onError = function(){
    log("Disconnected, or failed to connect :-(");
  };

  var init = function(){
    RobotUtils.connect(onConnected, onError); // async !
    return this;
  };

  return init();
};

ReactDOM.render((
  <App robotUtils={RobotUtils} qiHost={host} />
), document.getElementById('root'));
