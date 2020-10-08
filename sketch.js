var controlledball;
var database;
var position;
function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    controlledball = createSprite(250,250,10,10);
    controlledball.shapeColor = "red";

    var controlledballPosition = database.ref('ball/position');
    controlledballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x + x,
        'y':position.y + y,
    })
   // controlledball.x = controlledball.x + x;
   // controlledball.y = controlledball.y + y;
}
function readPosition(data){
    position = data.val();
    console.log(position.x);
    controlledball.x = position.x ;
    controlledball.y = position.y ;
}
function showError(){
    console.log('error');
}