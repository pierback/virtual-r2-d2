class Robot {
    constructor(env) {
        this._initializeVariables(env);
    }

    _initializeVariables(env) {
        this.robot = env.robot;
        const canvas = env.canvas;
        const canvasOffset = canvas.getBoundingClientRect();
        const canvasWidth = canvasOffset.width;
        const canvasHeight = canvasOffset.height;

        const robotLegWidth = 52;
        const robotStripeHeight = 45;
        const robotWidth = 225;
        //this.fullWidth = robotWidth + robotLegWidth * 2;

        const robotOffset = env.robot.getBoundingClientRect();
        console.log(robotOffset);
        const scale = robotOffset.width/robotWidth;
        const robotHeight = robotOffset.height / scale;

        this._xCorrection = (robotWidth-robotOffset.width)/2 - robotLegWidth * scale;

        this._height = robotOffset.height + robotStripeHeight * scale;
        this._width = robotOffset.width + robotLegWidth * 2 * scale;
        this._x = robotOffset.left - robotLegWidth * scale;
        this._y = robotOffset.top;

        const horizontalLine = (canvasHeight) * 0.61;
        //this._minY = horizontalLine - this._height/2;
        //this._maxY = canvasHeight - this._height;
        this._minY = 80;
        this._maxY = 400;

        //console.log('min y ' + this._minY);
        //console.log('max y ' + this._maxY);

        this._maxX = canvasWidth - this._width;
    }

    //returns pixels of right canvas border - width of robot
    getMaxX() {
        return this._maxX;
    }

    //returns pixels of left canvas border
    getMinX() {
        return 0;
    }

    //returns pixels of bottom canvas border + height of robot
    getMaxY(){
        return this._maxY;
    }

    //returns pixels of horizontal line in image + half of the height of the robot
    getMinY(){
        return this._minY;
    }

    getX(){
        return this._x;
    }

    getY() {
        return this._y;
    }

    //get width of robot
    getWidth() {
        return this._width;
    }

    //get height of robot
    getHeight() {
        return this._height;
    }

    setX(x) {
        console.log(x);
        this._x = x - this._xCorrection;
        console.log(this._x);
        this.robot.style.left = this._x;
    }

    setY(y) {
        if(y < this._minY){
            y = this._minY;
        } else if(y > this._maxY){
            y = this._maxY;
        }

        this._y = y;
        this.robot.style.top = y;
    }
}
exports.Robot = Robot;