﻿ #pragma strict
 
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
 
 
 // This is where the magic happens.
 //  FindObjectOfType(...) returns the first AManager object in the scene.
 instance =  FindObjectOfType(GameManager);
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
 		GUI.Label (Rect (10, 10, 100, 20), "Time: " + Mathf.FloorToInt(gameTime));
 }
 
 function Update(){
 
 	if (!timePaused)
 		gameTime += Time.deltaTime;
 
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