import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './global.css';

var robotUtilsWrapper = function(){


  /*QiSession Events*/
  var onConnected = function (session) {
    log('connected');
    session.service('ALMemory').then(function (serv) {
      ALMemory = serv;
    },
    function (error) {
      log('Unable to get the service ALMemory: ' + error);
    });
    RobotUtils.subscribeToALMemoryEvent('FACE_RECOGNIZED', window._faceRecognized);
    RobotUtils.subscribeToALMemoryEvent('ALTracker/TargetLost', window._targetLost);
  };
  var onError = function(){
    log("Disconnected, or failed to connect :-(");
  };
  var init = function(){
    RobotUtils.connect(onConnected, onError);
    return this;
  };
  return init();
};

ReactDOM.render((
  <App robotUtils={robotUtilsWrapper} />
), document.getElementById('root'));
