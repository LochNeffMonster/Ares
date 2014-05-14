#pragma strict

var playerObject : GameObject;
 
var normRot : float;

public var compassCamera : GameObject;
 
function Update () { 
    
    normRot = Mathf.Abs(playerObject.transform.eulerAngles.y); 
    //Debug.Log(normRot + " Comp: " + transform.eulerAngles.x);
    if (normRot > 360) {
        normRot = normRot % 360; 
    } 
    
    
    compassCamera.transform.eulerAngles.y = normRot; // because we look at the "back"
    
} 