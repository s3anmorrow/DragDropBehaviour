// Drag and Drop implemented in HTML5
// Sean Morrow
// May 28, 2014

// REFERENCE : http://www.createjs.com/tutorials/Mouse%20Interaction/
/*
Container.getObjectUnderPoint() returns the top most display object under the specified point.
Container.getObjectsUnderPoint() returns all display objects under the specified point.
DisplayObject.hitTest() returns true if the specified point in the display object is non-transparent.
*/

// TODO switch out graphics to be more interesting - may as well use drawing API for what I have
// TODO create reusable object
// TODO add collision detection with hitTest()

// game variables
var stage = null;
var canvas = null;

// object to preload and handle all assets (spritesheet and sounds)
var assetManager, dragDropCircle, dragDropSquare, circle, circleTarget, circleDock, square, squareTarget, squareDock, caption;

var gameConstants = {
	"FRAME_RATE":26
};

// manifest of asset information
var manifest = [
    {
        src:"lib/Assets.png",
        id:"Assets",
        data:{
            "frames":[
                [362, 2, 98, 98, 0, 49, 49],
                [464, 2, 90, 90, 0, 45, 45],
                [2, 2, 176, 176, 0, 0, 0],
                [182, 2, 176, 176, 0, 0, 0],
                [558, 2, 115, 28, 0, -2, -4]
            ],
            "animations":{
                "label": {"frames": [4], "speed": 1},
                "dock2": {"frames": [3], "speed": 1},
                "draggable1": {"frames": [0], "speed": 1},
                "draggable2": {"frames": [1], "speed": 1},
                "dock1": {"frames": [2], "speed": 1}
            }
        }
    },
    {
        //src:"lib/PlacedSound.mp3|lib/PlacedSound.ogg",
        src:"lib/PlacedSound.ogg",
        id:"PlacedSound",
        data:4
    },
    {
        //src:"lib/PlacedSound.mp3|lib/PlacedSound.ogg",
        src:"lib/SnappedSound.ogg",
        id:"SnappedSound",
        data:4
    }
];

// ------------------------------------------------------------ event handlers
function onInit() {
	console.log(">> initializing");

	// get reference to canvas
	canvas = document.getElementById("stage");
	// set canvas to as wide/high as the browser window
	canvas.width = 600;
	canvas.height = 600;
	// create stage object
    stage = new createjs.Stage(canvas);

    // color the background of the game with a shape
	background = new createjs.Shape();
	background.graphics.beginFill("#003333").drawRect(0,0,600,600);
	background.cache(0,0,600,600);
	stage.addChild(background);

	// construct preloader object to load spritesheet and sound assets
	assetManager = new AssetManager();
    stage.addEventListener("onAssetsLoaded", onSetup);
    // load the assets
	assetManager.loadAssets(manifest);
}

function onSetup() {
	console.log(">> setup");
	// kill event listener
	stage.removeEventListener("onAssetsLoaded", onSetup);

    // construct game objects
    circleDock = assetManager.getClip("Assets");
    circleDock.x = 400;
    circleDock.y = 400;
    circleDock.gotoAndStop("dock1");
    stage.addChild(circleDock);

    squareDock = assetManager.getClip("Assets");
    squareDock.x = 30;
    squareDock.y = 400;
    squareDock.gotoAndStop("dock2");
    stage.addChild(squareDock);

    caption = assetManager.getClip("Assets");
    caption.x = 140;
    caption.y = 60;
    caption.gotoAndStop("label");
    stage.addChild(caption);

    circle = assetManager.getClip("Assets");
    circle.x = 80;
    circle.y = 80;
    circle.gotoAndStop("draggable1");
    stage.addChild(circle);

    square = assetManager.getClip("Assets");
    square.x = 80;
    square.y = 200;
    square.gotoAndStop("draggable2");
    stage.addChild(square);

    circleTarget = assetManager.getClip("Assets");
    circleTarget.x = 491;
    circleTarget.y = 483;
    circleTarget.gotoAndStop("draggable1");
    circleTarget.alpha = 0.25;
    stage.addChild(circleTarget);

    squareTarget = assetManager.getClip("Assets");
    squareTarget.x = 120;
    squareTarget.y = 486;
    squareTarget.gotoAndStop("draggable2");
    squareTarget.alpha = 0.25;
    stage.addChild(squareTarget);

    // startup the ticker
    createjs.Ticker.setFPS(gameConstants.FRAME_RATE);
    createjs.Ticker.addEventListener("tick", onTick);

    // use our DragDrop object to make them draggable
    dragDropCircle = new DragDropBehaviour(circle, circleTarget);
    dragDropSquaree = new DragDropBehaviour(square, squareTarget);

    stage.addEventListener("onPlaced", onPlaced, true);
    stage.addEventListener("onSnapped", onSnapped, true);
}

function onPlaced(e) {
    console.log("placed");
    createjs.Sound.play("PlacedSound");
}

function onSnapped(e) {
    console.log("snapped");
    createjs.Sound.play("SnappedSound");
}

function onTick(e) {
    // TESTING FPS
    document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

    // put your own stuff here
    // ...

    // update the stage!
	stage.update();
}
