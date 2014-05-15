 #pragma strict
 
 /// AManager is a singleton.
 /// To avoid having to manually link an instance to every class that needs it, it has a static variable called
 /// instance, so other objects that need to access it can just call:
 ///        AManager.instance.DoSomeThing();
 ///
 
 static var instance : GameManager;
 static var label : GameObject;
 public var gameTime = 0f;
 public var timePaused = true;
 public var displayTime = false;
 public var pauseGame = false;
 private var kong : KongregateAPI;
 
 
 private var buttonWidth = 84;
 private var buttonHeight = 60;
 
 
 // This is where the magic happens.
 //  FindObjectOfType(...) returns the first AManager object in the scene.
 if (instance == null)
 	instance =  FindObjectOfType(GameManager);
 else 
 	Destroy(gameObject);
 DontDestroyOnLoad(instance);
 if (instance == null)
     Debug.Log ("Could not locate an GameManager object. \n" +
                     "You have to have exactly one GameManager in the scene.");
                    
 
 // Ensure that the instance is destroyed when the game is stopped in the editor.
 function OnApplicationQuit() {
     instance = null;
 }
 
 // Add the rest of the code here...
 
 function OnGUI(){
 	
 	if (displayTime)
 		GUI.Label (Rect (10, 10, 200, 40), "Time: " + Mathf.FloorToInt(gameTime));
 		
 	if (pauseGame)
 		pauseMenu();
 }
 
 function OnLevelWasLoaded (level : int) {
 		kong = gameObject.GetComponent(KongregateAPI);
		if (level == 6) {
			displayTime = true;
			gameTime = 0f;
			timePaused = false;
			kong.displayGUI = false;
		} else if (level == 0){
			displayTime = false;
			gameTime = 0f;
			timePaused = true;
			kong.displayGUI = false;
		} else if (level == 2 || level == 5){
			displayTime = false;
			timePaused = true;
			kong.displayGUI = true;
		} else {
			displayTime = false;
			timePaused = true;
			kong.displayGUI = false;
		}
	}
 
 function pauseMenu(){
 
 	if (
		GUI.Button(
		// Center in X, 2/3 of the height in Y
		new Rect(
		Screen.width / 2 - (buttonWidth / 2) + 200,
		(2 * Screen.height / 3) - (buttonHeight / 2),
		buttonWidth,
		buttonHeight
		),
		"Resume"
		)
		)
	{
		// On Click, load the first level.
		// "Stage1" is the name of the first scene we created.
		timePaused = false;
		pauseGame = false;
		Time.timeScale = 1;
	} else
	
	if (
		GUI.Button(
		// Center in X, 2/3 of the height in Y
		new Rect(
		Screen.width / 2 - (buttonWidth / 2) + - 200,
		(2 * Screen.height / 3) - (buttonHeight / 2),
		buttonWidth,
		buttonHeight
		),
		"Main Menu"
		)
		)
	{
		// On Click, load the first level.
		// "Stage1" is the name of the first scene we created.
		timePaused = false;
		pauseGame = false;
		Application.LoadLevel("mainMenu");
		Time.timeScale = 1;
	}
 	
 }
 
 function Update(){
 
 	if (!timePaused)
 		gameTime += Time.deltaTime;
 		
 	if (pauseGame)
 		pauseMenu();
 		
 	// Input to open pause menu
	if (Input.GetKeyDown(KeyCode.Escape) && Application.loadedLevelName != "mainMenu") {
		pauseGame = !pauseGame;
		timePaused = !timePaused;
		Time.timeScale = (Time.timeScale + 1) % 2;
		
	}
 
 }
 
 function resetTime(){
 	gameTime = 0f;
 }
 
 function playPauseTime(onOrOff){
 	timePaused = onOrOff;
 }
 
 function showHideTime(onOrOff){
 	displayTime = onOrOff;
 }
 
 function uploadTime() {
     Debug.Log("Doing something now", this);
 }