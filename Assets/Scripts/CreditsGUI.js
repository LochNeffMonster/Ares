#pragma strict

public var xMods:int;
public var nameBuffer:int = 40;
public var buttonText:String;
public var loadLevel:String;
var sfxObject:GameObject;
public var santiTransform:Transform;
public var drewmanTransform:Transform;
public var millerTransform:Transform;
public var kenTransform:Transform;

var creditStyle : GUIStyle;


function Awake () {
    sfxObject = GameObject.Find("SFXManager");
}

function Update () {

}

function OnGUI()
{
	var buttonWidth = 140;
	var buttonHeight = 60;

    GUI.Label( Rect( drewmanTransform.position.x, millerTransform.position.y + 2*nameBuffer, 84, 60 ), "Andrew Truman Neff", creditStyle );
    GUI.Label( Rect( millerTransform.position.x, millerTransform.position.y, 84, 60 ), "Andrew Miller", creditStyle );
    GUI.Label( Rect( santiTransform.position.x, millerTransform.position.y + nameBuffer, 84, 60 ), "Santiago Selga-Eaton", creditStyle );
    GUI.Label( Rect( kenTransform.position.x, millerTransform.position.y + 3*nameBuffer, 84, 60 ), "Kenneth Thieu", creditStyle );
    if (
        GUI.Button(
        // Center in X, 2/3 of the height in Y
        new Rect(
        Screen.width / 2 - (buttonWidth / 2) + xMods,
        (2 * Screen.height / 3) - (buttonHeight / 2),
        buttonWidth,
        buttonHeight
        ),
        buttonText
        )
        )
    {
        // On Click, load the first level.
        // "Stage1" is the name of the first scene we created.
        sfxObject.GetComponent(SFXManager).RequestPing();
        Application.LoadLevel(loadLevel);
    }
}