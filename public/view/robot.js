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

        const robotOriginalLegWidth = 52; //original value
        const robotOriginalWidth = 225; // original value
        const robotOffset = env.robot.getBoundingClientRect();
        const xScale = robotOffset.width / robotOriginalWidth;
        this._xCorrection = Math.floor((robotOriginalWidth - robotOffset.width) / 2 - robotOriginalLegWidth * xScale);
        this._width = Math.floor(robotOffset.width + robotOriginalLegWidth * 2 * xScale);
        this._minX = 0;
        this._maxX = Math.floor(canvasWidth - this._width);
        this._startX = Math.floor((this._maxX / 2) - this._width);
        this.X = this._startX;

        const robotHeight = robotOffset.height;
        const robotNewLegHeight = 19; //estimation for scale 0.3
        const horizontalLine = (canvasHeight) * 0.61; //specific for desert image
        this._yCorrection = 158; //estimation needs to be changed if scale is changed
        this._height = Math.floor(robotHeight + robotNewLegHeight);
        this._minY = Math.floor(horizontalLine - robotHeight / 2);
        this._maxY = Math.floor(canvasHeight - robotHeight - robotNewLegHeight);
        this._startY = this._minY + Math.floor((this._maxY - this._minY) / 2);
        this.Y = this._startY;
    }


    //returns pixels of left canvas border
    //OUTPUT: Integer
    get MinX() {
        return 0;
    }

    //returns pixels of right canvas border - width of robot
    //Output: Integer
    get MaxX() {
        return this._maxX;
    }

    //returns current x position
    //Output: Integer (between 0 and maxX)
    get X() {
        return this._x + this._xCorrection;
    }

    //get width of robot
    //Output: Integer
    get Width() {
        return this._width;
    }

    //get start position (left from center)
    //Output: Integer
    get StartX() {
        return this._startX;
    }

    //Input: Integer (0 robot is on the left border, MaxX robot is on the right border)
    set X(x) {
        if (isNaN(x)) {
            console.log('Error: Your value is not a number.');
        } else {
            x = parseInt(x);
            if (x < this._minX) x = this._minX + 1;
            if (x > this._maxX) x = this._maxX - 1;
            this._x = x - this._xCorrection;
            this.robot.style.left = this._x;
        }
    }

    //----------- Y VALUES -------------------------------

    //returns pixels of horizontal line in image + half of the height of the robot
    //OUTPUT: Integer
    get MinY() {
        return this._minY;
    }

    //returns pixels of bottom canvas border + height of robot
    //OUTPUT: Integer
    get MaxY() {
        return this._maxY;
    }

    //returns default start pos
    //OUTPUT: Integer
    get StartY() {
        return this._startY;
    }

    //get height of robot
    //OUTPUT: Integer
    get Height() {
        return this._height;
    }

    //get current y position
    //OUTPUT: Integer
    get Y() {
        return this._y + this._yCorrection;
    }

    //set y position
    //INPUT: Integer
    set Y(y) {
        if (isNaN(y)) {
            console.log('Error: Your value is not a number.');
        } else {
            y = parseInt(y);
            if (y < this._minY) y = this._minY + 1;
            if (y > this._maxY) y = this._maxY - 1;
            this._y = y - this._yCorrection;
            this.robot.style.top = this._y;
        }
    }

    // set center of robot
    // Currently not needed ¯\_(ツ)_/¯ 
    set Center(c) {
        this._center = c;
    }
    // set center of robot
    //OUTPUT: Integer
    get Center() {
        return Math.floor((this.Width / 3) + this.X);
    }
}

exports.Robot = Robot;