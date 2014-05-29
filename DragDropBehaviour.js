var DragDropBehaviour = function(draggable, target) {
    // does the piece snap back if not placed?
    var snapBack = true;

    // starting location of draggable object
    var startX = draggable.x;
    var startY = draggable.y;

    // custom events - true is so that the event bubbles
	var eventPlaced = new createjs.Event("onPlaced", true);
	var eventSnapped = new createjs.Event("onSnapped", true);

    // setup event listeners
    draggable.on("pressmove", onDown);
    draggable.on("pressup", onUp);

    // ------------------------------- get/set methods
    this.getSnapBack = function() {
        return snapBack;
    };
    this.setSnapBack = function(value) {
        snapBack = value;
    };

    // ------------------------------- Event Handlers
    function onDown(e) {
        focus();

        // move draggable sprite to whereever the mouse currently is on the stage
        // APPROACH I
        draggable.x = e.stageX;
        draggable.y = e.stageY;
        // APPROACH II
        //e.target.x = e.stageX;
        //e.target.y = e.stageY;
    }

    function onUp(e) {
        // only detect collision if target mc has been set
        if (target !== undefined) {
            // Convert the x,y position form the global stage coordinate space to the coordinate space of target
            // Why do we need to do this? x,y position is all relative to where the registration point it
            // On the stage it is ALWAYS the upper left corner (0,0) but in another Sprite it will be releative to
            // its own registration point
            // For hitTest() to work it needs to have the point in the same coordinate space as the target
            var point = target.globalToLocal(draggable.x, draggable.y);
            console.log("collision? " + target.hitTest(point.x, point.y));

            // check for collision
            if (draggable.hitTest(point.x,point.y)) {
                // snap to location of target
                draggable.x = target.x;
                draggable.y = target.y;
                draggable.dispatchEvent(eventPlaced);
            } else {
                if (snapBack) {
                    // snap back to position
                    draggable.x = startX;
                    draggable.y = startY;
                    draggable.dispatchEvent(eventSnapped);
                }
            }
        }
    }

    // -------------------------------- private methods
    function focus() {
        // readd draggable to ensure whatever is being dragged is on top of everything else
        draggable.getStage().addChild(draggable);
    }
};
