import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './global.css';

var robotUtilsWrapper = function(){
  var ALMemory = null;

  /*QiSession Events*/
  var onConnected = function (session) {
    console.log('connected');
    session.service('ALMemory').then(function (serv) {
      ALMemory = serv;
    },
    function (error) {
      console.log('Unable to get the service ALMemory: ' + error);
    });
    RobotUtils.subscribeToALMemoryEvent('FACE_RECOGNIZED', window._faceRecognized);
    RobotUtils.subscribeToALMemoryEvent('SAD_PERSON', window._sadPerson);
    RobotUtils.subscribeToALMemoryEvent('CALENDAR_REMINDER', window._calendarReminder);
    RobotUtils.subscribeToALMemoryEvent('BAD_ACCOUNT_BALANCE', window._badAccountBalance);
    RobotUtils.subscribeToALMemoryEvent('ALTracker/TargetLost', window._targetLost);
  };
  var onError = function(){
    console.log("Disconnected, or failed to connect :-(");
  };
  var init = function(){
    console.log("initialize robots");
    RobotUtils.connect(onConnected, onError);
    return this;
  };
  return init();
};

ReactDOM.render((
  <App robotUtils={robotUtilsWrapper} />
), document.getElementById('root'));
