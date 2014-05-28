// Drag and Drop implemented in HTML5
// Sean Morrow
// May 28, 2014

// game variables
var stage = null;
var canvas = null;

// object to preload and handle all assets (spritesheet and sounds)
var assetManager, circle, dock, caption;

var gameConstants = {
	"FRAME_RATE":26
};

// manifest of asset information
var manifest = [{
    src:"lib/Assets.png",
    id:"Assets",
    data:{
        "frames":[
            [182, 2, 98, 98, 0, 1, 1],
            [2, 2, 176, 176, 0, 0, 0],
            [284, 2, 104, 28, 0, -2, -4]
        ],
        "animations":{
            "label": {"frames": [2], "speed": 1},
            "dock": {"frames": [1], "speed": 1},
            "circle": {"frames": [0], "speed": 1}
        }
    }
}];

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

    // enable mouseover events for the stage - disabled by default since they can be expensive
    //stage.enableMouseOver();

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
    circle = assetManager.getClip("Assets");
    circle.x = 30;
    circle.y = 30;
    circle.gotoAndStop("circle");
    stage.addChild(circle);

    caption = assetManager.getClip("Assets");
    caption.x = 140;
    caption.y = 60;
    caption.gotoAndStop("label");
    stage.addChild(caption);

    dock = assetManager.getClip("Assets");
    dock.x = 400;
    dock.y = 400;
    dock.gotoAndStop("dock");
    stage.addChild(dock);

    // startup the ticker
    createjs.Ticker.setFPS(gameConstants.FRAME_RATE);
    createjs.Ticker.addEventListener("tick", onTick);



    circle.addEventListener("mousedown", onDown);

}

function onDown(e) {
    //e.addEventListener()

    console.log("onDown!");

}


function onTick(e) {
    // TESTING FPS
    document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();


    // update the stage!
	stage.update();
}

