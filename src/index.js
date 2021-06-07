import { draw } from "./scripts/animator"

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let backgroundImg = new Image;
backgroundImg.src = "src/images/Background.png"
backgroundImg.onload = () => {
   


}





const interval = setInterval(draw, 200)