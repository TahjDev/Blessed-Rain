import Player from "./animator"
import { frames } from "./frames"

const allFrameSets = {
    right: {
        idleRight: [0, 1, 2],
        jumpRight: [6, 7, 8],
        runRight: [12, 13, 14, 15, 16, 17, 18]
    },
    left: {
        idleLeft: [3, 4, 5],
        jumpLeft: [9, 10, 11]
    },
}


const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let x = 50;
let y = canvas.height - 100;
let velocity_x = 0
let velocity_y = 0

let rightpressed = false;

let leftpressed = false;

let lastpressed = false

let uppressed = false

let idle = true


let player = new Player(allFrameSets.right.idleRight)

const setIdle = () => {
    if (velocity_x === 0 && lastpressed == "right" && idle === false) {
        idle = true
        player = new Player(allFrameSets.right.idleRight)
    }
    else if (velocity_x === 0 && lastpressed == "left" && idle === false) {
        idle = true
        player = new Player(allFrameSets.left.idleLeft)
    }
    else if (velocity_x === 0 && lastpressed == false && idle === false) {
        idle = true
        player = new Player(allFrameSets.right.idleRight)
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
    if (leftpressed && idle === true) {
        idle = false
        velocity_x = -20
        lastpressed = "left"
        // rightpressed = false
        player = new Player(allFrameSets.right.runRight)
        if (uppressed) {
            player = new Player(allFrameSets.run.runRight)
        }
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
        ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, x, y, 80, 100)
        // ctx.drawImage(img, 120, 212, 55, 70, x, y, 80, 100)
        // ctx.drawImage(img, 272, 133, 55, 70, x, y, 80, 100)
        // ctx.drawImage(img, 62, 212, 55, 70, x, y, 80, 100)
        // ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, x, y, 80, 100)
        
    }
        // gravity
        y += 25 
        
        // collision control
    if (x + 2 > canvas.width - 80) (x = canvas.width - 80)

    if (x - 2 < 0) (x = 0)

    if (y + 8 > canvas.height - 100 ) y = canvas.height-100
         // collision control

        //  moving right and left
    if (leftpressed) x += velocity_x
    if (rightpressed) x += velocity_x
    if (uppressed && y === canvas.height-100) {
        y -=80

    }
            //  moving right and left
}


const keyDownHandler = (e) => {
    
    
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightpressed = true
        velocity_x = 20
       
    }
    else if ((e.key == "Up" || e.key == "ArrowUp") && (uppressed === false)) {
        uppressed = true

    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftpressed = true
        velocity_x = -20
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
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);