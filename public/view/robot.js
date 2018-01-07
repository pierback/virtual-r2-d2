class Robot {
    constructor(env){
        this._initializeVariables(env);
    }

    _initializeVariables(env){
        const canvas = env.canvas;
        const canvasOffset = canvas.getBoundingClientRect();
        this.leftBorder = canvasOffset.left;
        this.rightBorder = canvasOffset.right;
        this.topBorder = canvasOffset.bottom + 250; //temporary estimation (should be horizontal line in image)

        const robotOffset = env.robot.getBoundingClientRect();
        console.log(robotOffset);
        this.x = robotOffset.left;
        this.y = robotOffset.top;
        this.height = robotOffset.height;
        this.width = robotOffset.Offset.width
    }
}

exports.Robot = Robot;



