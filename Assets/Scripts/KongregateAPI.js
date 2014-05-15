#pragma strict

//KongregateAPI.js
 
//////////////////////////////////////////////////////////////////////////////
//                                                                          //
//                  SUBMIT STATISTICS WITH                                  //
//                                                                          //
//  Application.ExternalCall("kongregate.stats.submit","MatchesMade",1);    //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
 
 
 
public var isKongregate = false;
public var userId = 0;
static var username = "Guest";
public var gameAuthToken = "";

private var buttonWidth = 100;
private var buttonHeight = 60;

public var displayGUI = false;
private static var gameManager : GameManager;
gameManager = GameManager.instance;
var menuStyle : GUIStyle;

function displaySubmitScore(){

	
	GUI.Label (Rect (Screen.width / 2 - 100, Screen.height / 2 - 20, 200, 40), "You survived for " + Mathf.FloorToInt(gameManager.gameTime) + " seconds.", menuStyle);

	if (Application.loadedLevelName != "defeatScreen")
	if (
		GUI.Button(
		// Center in X, 2/3 of the height in Y
		new Rect(
		Screen.width / 2 - (buttonWidth / 2) ,
		(2 * Screen.height / 3) - (buttonHeight / 2) + 200,
		buttonWidth,
		buttonHeight
		),
		"Submit Time"
		)
		)
	{
		submitStat("Fastest Time", Mathf.FloorToInt(gameManager.gameTime));
	}

}

function OnGUI(){

	if (displayGUI)
		displaySubmitScore();

}


 
function OnKongregateAPILoaded(userInfoString : String){
  // We now know we're on Kongregate
  isKongregate = true;
  Debug.Log("ON KONG");
 
  // Split the user info up into tokens
  var params = userInfoString.Split("|"[0]);
  userId = parseInt(params[0]);
  username = params[1];
  gameAuthToken = params[2];
}

public function submitStat(statName : String, intValue : int){

	Application.ExternalCall("kongregate.stats.submit",statName,intValue);

}
 
 
function Awake()
    {
    // This game object needs to survive multiple levels
    DontDestroyOnLoad (this);
    
    menuStyle.fontSize = 24;
    menuStyle.normal.textColor = Color.cyan;
    menuStyle.alignment = TextAnchor.MiddleCenter;
 
    // Begin the API loading process if it is available
Application.ExternalEval(
  "if(typeof(kongregateUnitySupport) != 'undefined'){" +
  " kongregateUnitySupport.initAPI('KongregateAPI', 'OnKongregateAPILoaded');" +
  "}"
);
    }