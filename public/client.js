/*
client.js

Author: Nikolas Martelaro (nmartelaro@gmail.com)
Extended: David Goeicke (da.goedicke@gmail.com)
Purpose: This run the interactivity and communication for the web app. This file
is served to the users web browser and executes on the browser.

Usage: This file is called automatically when the webpage is served.

//--Addition. Added a button handling for the `Take a picture` button.
*/
// WebSocket connection setup
var socket = io();

// send out LedOn message over socket
function ledON() {
  socket.emit('ledON');
}

// send out ledOFF message over socket
function ledOFF() {
  socket.emit('ledOFF');
}

//-- Addition: Forward the `Take a picture` button-press to the webserver.
function takePicture(){
  socket.emit('takePicture');
}

//-- Addition: This function receives the new image name and applies it to html element.

socket.on('newPicture', function(msg) {
  document.getElementById('pictureContainer').src=msg;
});

socket.on('refreshColors', function(colors) {
  var div = document.getElementById('colorsHolder');
  
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  console.log('refresh Color!!!!!!!!!!!!!!!!!');
  console.log(colors[0]);
   for (i = 0; i < colors.length; i++) {
    // <rect width="300" height="100" style="fill:#fff;" />
    var colorDiv = document.createElement('div');
    colorDiv.setAttribute('height', '90');
    colorDiv.setAttribute('width', '50');
    colorDiv.setAttribute('style', ('background-color:' + colors[i]));
    colorDiv.appendChild(document.createTextNode(colors[i]));
    div.appendChild(colorDiv);
  }
});

// read the data from the message that the server sent and change the
// background of the webpage based on the data in the message
socket.on('server-msg', function(msg) {
  msg = msg.toString();
  console.log('msg:', msg);
  switch (msg) {
    case "light":
      document.body.style.backgroundColor = "white";
      console.log("white")
      break;
    case "dark":
      document.body.style.backgroundColor = "black";
      console.log("black");
      break;
    default:
      //console.log("something else");
      break;
  }
});
