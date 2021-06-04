import { frames } from "./frames"




class Player { 
    constructor(frameSet, mode = "loop") {
            this.count = 0
            this.delay = 1
            this.frameIndex = 0
            this.frameSet = frameSet
            this.frameValue = frameSet[0]
            this.mode = mode
        
    }

    frameValue() {
        return this.frameValue
    }

    animate() {
        switch (this.mode) {
            case "loop":
                this.loop()
                break;
            case "play":
                this.play()
                "break"
            case "pause":
                break;

        }
    }

    play() {
        this.count ++

        this.frameIndex++

        if (this.count > this.frameSet.length - 1) {
            return null 
        }  
        else {
            this.frameValue[this.frameIndex]
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