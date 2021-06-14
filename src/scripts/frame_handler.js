
class FrameHandler { 
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

    frameSetlength (){
        return this.frameSet.length
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


    loop() {
        this.count++

        console.log(this.frameSet)
        console.log(this.count)

        this.frameIndex = (this.count > this.frameSet.length - 1) ? this.count = 0 : this.frameIndex + 1

        this.frameValue = this.frameSet[this.frameIndex]

    
        
    }

    count() {
        return this.count
    }

    updateAnimation() {
        this.animate()
    }


}





export default FrameHandler;