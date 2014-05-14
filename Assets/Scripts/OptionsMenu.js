#pragma strict

public var buttonText:String;
public var loadLevel:String;
public var sfxObject:GameObject;
public var sfxSource:AudioSource;
public var xMods:int;
private var masterVolume : float = 1.0;
private var sfxVolume : float = 1.0;

function Awake(){
    sfxObject = GameObject.Find("SFXManager");
    sfxSource = sfxObject.GetComponent(AudioSource);
    masterVolume = sfxSource.volume;
}
 
function OnGUI()
{
    var groupWidth = 380;
    var groupHeight = 110;
    var buttonWidth = 140;
	var buttonHeight = 60;
     
    var screenWidth = Screen.width;
    var screenHeight = Screen.height;
     
    var groupX = ( screenWidth - groupWidth ) / 2;
    var groupY = ( screenHeight - groupHeight ) / 3;
     
    GUI.BeginGroup( Rect( groupX, groupY, groupWidth, groupHeight ) );
    GUI.Box( Rect( 0, 0, groupWidth, groupHeight ), "Audio Settings" );
     
    GUI.Label( Rect( 10, 30, 100, 30 ), "Ping Volume" );
    sfxSource.volume = masterVolume = GUI.HorizontalSlider( Rect( 120, 35, 200, 30 ), masterVolume, 0.0, 1.0 );
    GUI.Label( Rect( 330, 30, 50, 30 ), "(" + masterVolume.ToString("f2") + ")");
 
    //GUI.Label( Rect( 10, 70, 100, 30 ), "Effect Volume" );
    //sfxVolume = GUI.HorizontalSlider( Rect( 120, 75, 200, 30 ), sfxVolume, 0.0, 1.0 );
    //GUI.Label( Rect( 330, 70, 50, 30 ), "(" + sfxVolume.ToString("f2") + ")");
 
    GUI.EndGroup(); 
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