'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');

// Boilerplate code to make your life easier
FamousEngine.init();

// Initialize with a scene; then, add a 'node' to the scene root
var logo = FamousEngine.createScene().addChild();

// Create an [image] DOM element providing the logo 'node' with the 'src' path
new DOMElement(logo, { tagName: 'img' })
    .setAttribute('src', './images/hrhq-logo@2x.svg');

// Chainable API
logo
    // Set size mode to 'absolute' to use absolute pixel values: (width 250px, height 250px)
    .setSizeMode('absolute', 'absolute', 'absolute')
    .setAbsoluteSize(250, 250)
    // Center the 'node' to the parent (the screen, in this instance)
    .setAlign(0.5, 0.5)
    // Set the translational origin to the center of the 'node'
    .setMountPoint(0.5, 0.5)
    // Set the rotational origin to the center of the 'node'
    .setOrigin(0.5, 0.5);

// Add a spinner component to the logo 'node' that is called, every frame
var spinner = logo.addComponent({
    onUpdate: function(time) {
        logo.setRotation(0, time / 1000, 0);
        logo.requestUpdateOnNextTick(spinner);

        logo.setAbsoluteSize(newNum(), 250);
    }
});

// Let the magic begin...
logo.requestUpdate(spinner);


function enlargeDecrease(num){
  var x;
  var direction;
  return function inner(){
      if(!x){
          x = num;
          direction = 'up';
          return;
      }
      if(direction === 'up'){
          if(x <= (num * 3.0)) {
              x += 2;
          }
          else {
              direction = 'down';
          }
      }
      else if(direction === 'down') {
          if(x >= num) {
              x -= 2;
          }
          else {
              direction = 'up';
          }
      }
      return x;
  };
}

var newNum = enlargeDecrease(250);
