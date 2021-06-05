
    class Frame {
        constructor(x, y, width, height, cWidth, cHeight, offset = 0) {
            this.x = x 
            this.y = y 
            this.height = height
            this.width = width
            this.canvasWidth = cWidth
            this.canvasHeight = cHeight
            this.offset = offset
   
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

        offset() {
            return this.offset
        }

    }

export const frames = [
    new Frame(0, 5, 60, 70, 80, 100), new Frame(62, 5, 60, 70, 80, 100), new Frame(125, 5, 60, 70, 80, 100),  // 0 idle right
    new Frame(189, 5, 60, 70, 80, 100), new Frame(250, 5, 60, 70, 80, 100),new Frame( 312, 5, 60, 70, 80, 100), // 3 idle left
    new Frame(40, 70, 55, 70, 80, 100), new Frame(40, 70, 55, 70, 80, 100), new Frame(40, 70, 55, 70, 80, 100), //6 jump right
    new Frame(280, 70, 55, 70, 80, 100), new Frame(280, 70, 55, 70, 80, 100), new Frame(280, 70, 55, 70, 80, 100), //9 jump right
    new Frame(100, 133, 55, 70, 80, 100), new Frame(164, 133, 55, 70, 80, 100), new Frame(225, 133, 55, 70, 80, 100), new Frame(285, 133, 55, 70, 80, 100), new Frame(335, 133, 55, 70, 80, 100), new Frame(0, 212, 55, 70, 80, 100), new Frame(62, 212, 55, 70, 80, 100), //12 runnning right
    new Frame(115, 212, 55, 70, 80, 100), new Frame(170, 212, 55, 70, 80, 100), new Frame(225, 212, 55, 70, 80, 100), new Frame(277, 212, 55, 70, 80, 100), new Frame(325, 212, 55, 70, 80, 100), new Frame(4, 292, 55, 70, 80, 100), new Frame(75, 292, 55, 70, 80, 100), // 19 attackleft
    new Frame(295, 292, 55, 70, 80, 100), new Frame(6, 380, 100, 70, 140, 100), new Frame(135, 384, 100, 70, 140, 100), new Frame(233, 382, 100, 70, 140, 100),   //26 basic attack right
    new Frame(2, 467, 76, 72, 96, 100), new Frame(98, 467, 120, 70, 160, 100), new Frame(199, 467, 100, 70, 140, 100), new Frame(297, 467, 100, 70, 140, 100),   //30 basic attack left
    new Frame(-33, 540, 76, 72, 96, 100), new Frame(98, 467, 120, 70, 160, 100), new Frame(199, 467, 100, 70, 140, 100), new Frame(297, 467, 100, 70, 140, 100)   //30 special attack right
]
