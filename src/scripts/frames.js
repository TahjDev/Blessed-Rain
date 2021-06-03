
    class Frame {
        constructor(x, y, width, height) {
            this.x = x 
            this.y = y 
            this.height = height
            this.width = width
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
    }

export const frames = [
    new Frame(0, 5, 60, 70, 100, 110), new Frame(62, 5, 60, 70), new Frame(125, 5, 60, 70),  // 0 idle right
    new Frame(197, 5, 60, 70), new Frame(258, 5, 60, 70),new Frame( 320, 5, 60, 70), // 3 idle left
    new Frame(40, 70, 55, 70), new Frame(40, 70, 55, 70), new Frame(40, 70, 55, 70), //6 jump right
    new Frame(280, 70, 55, 70), new Frame(280, 70, 55, 70), new Frame(280, 70, 55, 70), //9 jump right
    new Frame(100, 133, 55, 70), new Frame(164, 133, 55, 70), new Frame(225, 133, 55, 70), new Frame(285, 133, 55, 70), new Frame(335, 133, 55, 70), new Frame(0, 212, 55, 70), new Frame(62, 212, 55, 70), //12 runnning right
    new Frame(272, 212, 55, 70), new Frame(280, 70, 55, 70), new Frame(280, 70, 55, 70), //19 runnning left


]
