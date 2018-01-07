class Robot {
    constructor(env) {
        this._initializeVariables(env);
    }

    _initializeVariables(env) {
        const canvas = env.canvas;
        const canvasOffset = canvas.getBoundingClientRect();
        this._leftBorder = canvasOffset.left;
        this._rightBorder = canvasOffset.right;
        this._bottomBorder = canvasOffset.bottom;
        this._topBorder = canvasOffset.bottom + 250; //temporary estimation (should be horizontal line in image)

        const robotOffset = env.robot.getBoundingClientRect();
        console.log(robotOffset);
        this._x = robotOffset.left;
        this._y = robotOffset.top;

        env.robot.style.left = 250;
        console.log(this._x);
        console.log(env.robot.getBoundingClientRect().left);
        console.log(env.robot.style.left);

        this._height = robotOffset.height;
        this._width = robotOffset.width;
    }

    //returns pixels of right canvas border - width of robot
    getMaxX() {
        return this._rightBorder - this._width;
    }

    //returns pixels of left canvas border
    getMinX() {
        return this._leftBorder;
    }

    //returns pixels of bottom canvas border + height of robot
    getMaxY(){
        return this._bottomBorder + this._height;
    }

    //returns pixels of horizontal line in image + half of the height of the robot
    getMinY(){
        const horizontalLine = (this._bottomBorder - this._topBorder) * 0.61;
        return this._topBorder + horizontalLine + this.height/2;
    }

    getX(){
        //return this.
    }

    getY() {

    }

    //get width of robot
    getWidth() {

    }

    //get height of robot
    getHeight() {

    }

    setX(x) {

    }

    setY(y) {

    }
}
exports.Robot = Robot;