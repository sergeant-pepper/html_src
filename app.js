import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './global.css';

var application = function(){
  var ALMemory = null;

  var log = function(l){
    if(console) console.log(l)  ;
  };

  $("#touch_me").click(function(){
    $("#touch_me").fadeOut(function(){
      setTimeout(function(){
        $("#touch_me").fadeIn()
      }, 3000)
    })
  })

  // Event: template/changeBGColor
  function changeBGColor(data) {
    bg_animation = data[2];
    bg_color1 = data[0];
    bg_color2 = null;
    bg_duration = data[1];
    $('body').animate({'background-color': bg_color1}, bg_duration, bg_animation);
  }

  // Event: ALTracker/TargetLost
  function targetLost() {
    $('#root').html('I am alone :(');
  }

  // Event: FACE_RECOGNIZED
  function faceRecognized(data) {
    $('#root').html('Face recognized: [' + data + ']');
  }

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
    console.log("application init");
    RobotUtils.connect(onConnected, onError); // async !
    return this;
  };

  return init();
};

application();

ReactDOM.render((
  <App />
), document.getElementById('root'));
