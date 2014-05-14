#pragma strict

public var xMods:int[];
public var buttonText:String[];
public var loadLevel:String[];
var sfxObject:GameObject;

function Awake (){
    if(GameObject.Find("SFXManager") == null){
        sfxObject = new GameObject();
        sfxObject.name = "SFXManager";
        sfxObject.AddComponent(SFXManager);
    }else{
        sfxObject = GameObject.Find("SFXManager");
    }
        
}

function OnGUI()
{
	var buttonWidth = 84;
	var buttonHeight = 60;
	
	for (var i = 0; i < loadLevel.Length; i++){

		if (
			GUI.Button(
			// Center in X, 2/3 of the height in Y
			new Rect(
			Screen.width / 2 - (buttonWidth / 2) + xMods[i],
			(2 * Screen.height / 3) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			),
			buttonText[i]
			)
			)
		{
			// On Click, load the first level.
			// "Stage1" is the name of the first scene we created.
            sfxObject.GetComponent(SFXManager).RequestPing();
			Application.LoadLevel(loadLevel[i]);
		}

	}
}
