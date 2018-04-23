// Open and connect output socket
let socket = io('/output');

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

// Keep track of users
let users = {};

// Create new user in the middle
function createNewUser(id) {
  users[id] = {
    pos: { x : width/2, y : height/2 },
    ppos: { x : width/2, y : height/2 }
    // pos: createVector(width/2, height/2), //{ x : width/2, y : height/2 },
    // ppos: createVector(width/2, height/2), //{ x : width/2, y : height/2 }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);



  // Listen for dislike data from server
  socket.on('tilt', function (id) {
    if(!(id in users)) {
      users[id] = [];
    }
    users[id].push('dislike');

  });
  // Listen for like data from server
  socket.on('shake', function (id) {
    if(!(id in users)) {
      users[id] = [];
    }
    users[id].push('like');

    // let id = message.id;
    // let user = users[id] || createNewUser(id);
    // let force = message.data;
    // blop(user.pos, force);
  });

  // Remove disconnected users
  socket.on('disconnected', function(id){
    delete users[id];
  });
}

function draw(){
  for(let u in users) {
    let reactions = users[u];
    for(let r = 0; r < reactions.length; r++){
      console.log(reactions[r]);
    }
  }
}
