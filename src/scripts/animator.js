import { frames } from "./frames"




class Player { 
    constructor(frameSet, delay) {
            this.count = 0
            this.delay = 1
            this.frameIndex = 0
            this.frameSet = frameSet
            this.frameValue = frameSet[0]
            this.mode = "loop"
        
    }

    frameValue() {
        return this.frameValue
    }

    changeFrameSet(frameset, mode, delay = 10, frame_index) {

    }

    animate() {
        switch (this.mode) {
            case "loop":
                this.loop()
                break;
            case "pause":
                break;

        }
    }

    loop() {
        this.count++

        console.log(this.frameSet)
        console.log(this.count)

        this.frameIndex = (this.count > this.frameSet.length - 1) ? this.count = 0 : this.frameIndex + 1

        this.frameValue = this.frameSet[this.frameIndex]

    
        
    }

    updateAnimation() {
        this.animate()
    }


}





export default Player;