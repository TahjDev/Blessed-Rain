
    class PlayerFrame {
        constructor(x, y, width, height, cWidth, cHeight, offsetX = 0, offsetY = 0) {
            this.x = x 
            this.y = y 
            this.height = height
            this.width = width
            this.canvasWidth = cWidth
            this.canvasHeight = cHeight
            this.offsetX = offsetX
            this.offsetY = offsetY
   
        }

        x() {
            return this.x
        }
        y() {
           return this.y
        }

        height() {
           return this.height
        } 
        width(){
           return this.width
        }

        canvasWidth() {
            return this.canvasWidth
        }
        canvasHeight() {
            return this.canvasHeight
        }

        offsetX() {
            return this.offsetX
        }
        offsetY() {
            return this.offsetY
        }

    }

export const frames = [
    new PlayerFrame(0, 5, 60, 70, 80, 100), new PlayerFrame(62, 5, 60, 70, 80, 100), new PlayerFrame(125, 5, 60, 70, 80, 100),  // 0 idle right
    new PlayerFrame(189, 5, 60, 70, 80, 100), new PlayerFrame(250, 5, 60, 70, 80, 100),new PlayerFrame( 312, 5, 60, 70, 80, 100), // 3 idle left
    new PlayerFrame(40, 70, 55, 70, 80, 100), new PlayerFrame(40, 70, 55, 70, 80, 100), new PlayerFrame(40, 70, 55, 70, 80, 100), //6 jump right
    new PlayerFrame(280, 70, 55, 70, 80, 100), new PlayerFrame(280, 70, 55, 70, 80, 100), new PlayerFrame(280, 70, 55, 70, 80, 100), //9 jump right
    new PlayerFrame(100, 133, 55, 70, 80, 100), new PlayerFrame(164, 133, 55, 70, 80, 100), new PlayerFrame(225, 133, 55, 70, 80, 100), new PlayerFrame(285, 133, 55, 70, 80, 100), new PlayerFrame(335, 133, 55, 70, 80, 100), new PlayerFrame(0, 212, 55, 70, 80, 100), new PlayerFrame(62, 212, 55, 70, 80, 100), //12 runnning right
    new PlayerFrame(115, 212, 55, 70, 80, 100), new PlayerFrame(170, 212, 55, 70, 80, 100), new PlayerFrame(225, 212, 55, 70, 80, 100), new PlayerFrame(277, 212, 55, 70, 80, 100), new PlayerFrame(325, 212, 55, 70, 80, 100), new PlayerFrame(4, 292, 55, 70, 80, 100), new PlayerFrame(75, 292, 55, 70, 80, 100), // 19 running left attackleft
    new PlayerFrame(295, 292, 55, 70, 80, 100), new PlayerFrame(6, 380, 100, 70, 140, 100), new PlayerFrame(135, 384, 100, 70, 140, 100), new PlayerFrame(233, 382, 100, 70, 140, 100),   //26 basic attack right
    new PlayerFrame(2, 467, 76, 72, 96, 100), new PlayerFrame(98, 467, 120, 70, 160, 100), new PlayerFrame(199, 467, 100, 70, 140, 100), new PlayerFrame(297, 467, 100, 70, 140, 100),   //30 basic attack left
    new PlayerFrame(-33, 545, 100, 70, 140, 100, 50, 25), new PlayerFrame(60, 530, 76, 100, 100, 120, 10, 25),  new PlayerFrame(140, 550, 100, 70, 140, 100, 10, 18), new PlayerFrame(240, 547, 100, 70, 140, 100, 10, 18), new PlayerFrame(-25, 630, 100, 70, 140, 100, 20, 18), new PlayerFrame(76, 637, 100, 70, 140, 100, 40, 18),  //34 special attack right
    new PlayerFrame(220, 633, 100, 70, 140, 100, 10, 25), new PlayerFrame(-9, 720, 100, 70, 140, 100, 10, 18), new PlayerFrame(90, 720, 100, 70, 140, 100, 10, 18), new PlayerFrame(170, 720, 100, 70, 140, 100, 45, 18), new PlayerFrame(270, 720, 100, 70, 140, 100, 60, 18), new PlayerFrame(20, 805, 100, 70, 140, 100, 40, 18)  //40 special attack left
]

export default PlayerFrame