import Player from "./player"
import { frames } from "./frames"

const allFrameSets = {
    right: {
        idleRight: [0, 1, 2],
        jumpRight: [6, 7, 8],
        runRight: [12, 13, 14, 15, 16, 17, 18],
        basicAR: [26, 27, 28, 29]
    },
    left: {
        idleLeft: [3, 4, 5],
        jumpLeft: [9, 10, 11],
        runLeft: [19, 20, 21, 22, 23, 24, 25],
        basicAL: [30, 31, 32, 33]
    },
}


const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let x = 50;
let y = canvas.height - 100;
let velocity_x = 0;
let velocity_y = 0;

let rightpressed = false;

let leftpressed = false;

let lastpressed = "right";

let uppressed = false;

let idle = true;

let basicAttack = false;


let player = new Player(allFrameSets.right.idleRight)

const setIdle = () => {
    if (velocity_x === 0 && lastpressed == "right" && idle === false && basicAttack == false)  {
        idle = true
        player = new Player(allFrameSets.right.idleRight)
    }
    else if (velocity_x === 0 && lastpressed == "left" && idle === false && basicAttack == false) {
        idle = true
        player = new Player(allFrameSets.left.idleLeft)
    }
}

const runningRight = () => {
   
    if (rightpressed && idle === true) {
        idle = false
        velocity_x = 20
        lastpressed = "right"
        // rightpressed = false
        player = new Player(allFrameSets.right.runRight)
        if (uppressed) {
            player = new Player(allFrameSets.right.runRight)
        }
    } 
    else if (rightpressed && idle == false && lastpressed == "left") {
        velocity_x = -20
        lastpressed = "right"
        // rightpressed = false
        player = new Player(allFrameSets.right.runRight)
    }
}

const jumping = () => {
    if (uppressed ) {
        idle = false
        // uppressed = false
        player = lastpressed === "left" ? new Player(allFrameSets.left.jumpLeft) : new Player(allFrameSets.right.jumpRight)

        if (y <= canvas.height - 100) {
            setTimeout(() => {
               idle = true
            player = lastpressed === "left" ? new Player(allFrameSets.left.idleLeft) : new Player(allFrameSets.right.idleRight)

            }
                , 100)

        }

        // else if (lastpressed === "left") {
        //     setTimeout(() => {
        //         player = new Player(allFrameSets.left.idleLeft)
        //     }
        //         , 100)

        // }

    }

}

const runningLeft = () => {
    if (leftpressed && idle == true ) {
        idle = false
        velocity_x = -25
        lastpressed = "left"
        // rightpressed = false
        player = new Player(allFrameSets.left.runLeft)
        if (uppressed) {
            player = new Player(allFrameSets.left.runLeft)
        }
    } 
    else if (leftpressed && idle == false && lastpressed == "right") {
        velocity_x = -25
        lastpressed = "left"
        // rightpressed = false
        player = new Player(allFrameSets.left.runLeft)
    }
}

const basicAttacking = () => {
        
    if (basicAttack && idle == true && lastpressed == "left") {
        // basicAttack = false
        lastpressed = "left"

        idle = false
        player = new Player(allFrameSets.left.basicAL)

    } 
    else if (basicAttack && idle == true && (lastpressed == "right") ) {
        // basicAttack = false
        lastpressed = "right"
        idle = false
        player = new Player(allFrameSets.right.basicAR)
    }

    
}

export const draw = () => {

    setIdle()

    //running and looking right
    runningRight()
    console.log(lastpressed)
    // jumping 
    jumping()
  
    //running and looking left
    runningLeft()

    basicAttacking()
    
 
    console.log(player.frameValue)
    // drawing the player 
    let img = new Image();

    img.src = "src/images/tanjiro_sprite.png";
        // picks the correct number of frames
    let frame = frames[player.frameValue]
        // starts animation
    player.updateAnimation()

    img.onload = () => {
        // player.updateAnimation
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, x, y, frame.canvasWidth, frame.canvasHeight)
        // ctx.drawImage(img, 98, 467, 120, 70, x, y, 160, 100)
        // ctx.drawImage(img, 2, 467, 76, 72, x, y, 96, 100)
        // ctx.drawImage(img, 199, 467, 100, 70, x, y, 140, 100)
        // ctx.drawImage(img, 297, 467, 100, 70, x, y, 140, 100)
      
        
    }
        // gravity
        y += 25 
        
        // collision control
    if (x + 2 > canvas.width - 80) (x = canvas.width - 80)

    if (x - 2 < 0) (x = 0)

    if (y + 8 > canvas.height - 100 ) y = canvas.height-100
         // collision control

        //  moving right and left
    if (leftpressed && rightpressed === false) x += velocity_x
    if (rightpressed && leftpressed === false) x += velocity_x
    if (uppressed && y === canvas.height-100) {
        y -=80

    }
            //  moving right and left
}


const keyDownHandler = (e) => {
    
    
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightpressed = true
       
    }
    else if ((e.key == "Up" || e.key == "ArrowUp") && (uppressed === false)) {
        uppressed = true

    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftpressed = true
    }

    else if (e.key == "a" || e.key == "KeyA") {
        basicAttack = true

    }

    
}

const keyUpHandler = (e) => {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightpressed = false
        velocity_x = 0
       
    }
    else if (e.key == "Up" || e.key == "ArrowUp") {
        uppressed = false
    }

    else if (e.key == "Left" || e.key == "ArrowLeft") {
        velocity_x = 0
        leftpressed = false
    }
    else if (e.key == "a" || e.key === "KeyA") {
        basicAttack = false
    //    let facing = lastpressed == "left" ? "left" : "right"
    //    setTimeout(() => lastpressed = facing, 100)
    }

    
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);