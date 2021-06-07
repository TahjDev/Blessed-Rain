import Player from "./player"
import { frames } from "./frames"

const allFrameSets = {
    right: {
        idleRight: [0, 1, 2],
        jumpRight: [6, 7, 8],
        runRight: [12, 13, 14, 15, 16, 17, 18],
        basicAR: [26, 27, 28, 29],
        specialAR: [34, 35, 36, 37, 38, 39]
    },
    left: {
        idleLeft: [3, 4, 5],
        jumpLeft: [9, 10, 11],
        runLeft: [19, 20, 21, 22, 23, 24, 25],
        basicAL: [30, 31, 32, 33],
        specialAL: [40, 41, 42, 43, 44, 45]
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

let specialAttack = false;
let then;
let specialPos;


let player = new Player(allFrameSets.right.idleRight)


const setIdle = () => {
    if (velocity_x === 0 && lastpressed == "right" && idle === false && !basicAttack && !specialAttack )  {
        idle = true
        player = new Player(allFrameSets.right.idleRight)
    }
    else if (velocity_x === 0 && lastpressed == "left" && idle === false && !basicAttack && !specialAttack ) {
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
        console.log(idle)
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

const specialAttacking = () => {
    if (specialAttack && idle == true && lastpressed == "left") {
         
        lastpressed = "left"
        console.log(idle)
        idle = false
        player = new Player(allFrameSets.left.specialAL)
        then = Date.now()
        
    }
    else if (specialAttack && idle == true && (lastpressed == "right")) {
        // basicAttack = false
        lastpressed = "right"
        idle = false
        then = Date.now()
        player = new Player(allFrameSets.right.specialAR)
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

    specialAttacking()

   
    
    
 
    console.log(player.frameValue)
    // drawing the player 

    let backgroundImg = new Image;
    backgroundImg.src = "src/images/Background.png"
    let playerImg = new Image();

    playerImg.src = "src/images/tanjiro_sprite.png";
        // picks the correct number of frames
    let frame = frames[player.frameValue]
        // starts animation
    player.updateAnimation()
    
    // lastpressed === "left" ? specialPos = (x - frame.offsetX + 50) : specialPos = (x - frame.offsetX - 50) 
    playerImg.onload = () => {
        // player.updateAnimation
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
        ctx.drawImage(playerImg, frame.x, frame.y, frame.width, frame.height, x - frame.offsetX, y - frame.offsetY, frame.canvasWidth, frame.canvasHeight)
        

        
        
    }

        // gravity
        y += 25 
        
        // collision control
    if (x + 2 > canvas.width - 80) (x = canvas.width - 80)

    if (specialAttack && lastpressed === "right") ( x += 50)
    if (specialAttack && lastpressed === "left") ( x -= 50)

    if (x - 2 < 0) (x = 0)

    if (y + 8 > canvas.height - 120 ) y = canvas.height - 120
         // collision control

        //  moving right and left
    if (leftpressed || rightpressed) x += velocity_x
    // if (rightpressed && leftpressed === false) x += velocity_x
    if (uppressed && y === canvas.height-120) {
        y -=80

    }
    let time;
    // console.log(specialPos)
    // console.log(specialCount)
    // console.log(player.frameSetlength())
    // console.log(player.count)
    console.log("framevalue")
    console.log(player.frameValue)
  



       
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

    else if (e.key == "s" || e.key == "KeyS") {
        specialAttack = true

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

    else if (e.key == "s" || e.key == "KeyS") {
        specialAttack = false

    }
    
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);