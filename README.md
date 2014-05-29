DragDropBehaviour
=================

Reusable object to make any CreateJS DisplayObject draggable and droppable  

__Usage:__  
Requires two sprites - one is the draggable sprite and the other is the target the draggable is to be dropped onto.  
Construction requires the two sprite names as arguments:  
`
dragDropBehaviour = new DragDropBehaviour(draggableSprite, targetSprite);
`  
By default if the draggable does not collide with the target it will snap back to its original position upon DragDropBehaviour construction.  
Get/set methods to alter this behaviour:  
`
dragDropBehaviour.setSnapBack(false);
`  
Will automatically bring the draggable object to the front of all sprites.  
See game.js for working demonstration.  
  
