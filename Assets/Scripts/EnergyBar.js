#pragma strict

	public var roverObj : GameObject; //For its transform and location
	public var curEnergy : float = 200;
	public var maxEnergy : float = 200;
    public var isCharging : boolean = false;
	private var position : Vector2= new Vector2(50, 50);
	private var size : Vector2 = new Vector2(200, 20);
	public var roverControl : ThirdPersonController;
	public var emptyBar : Texture2D;
	public var fullBar : Texture2D;
	public var icon : Texture2D;
	public var decayRate : float = 0.05f;
	public var rechargeRate: float = 0.5f;
	
	
	private var temp : boolean;
	
	function Awake() {
		roverControl =  GameObject.FindWithTag("Player").GetComponent(ThirdPersonController);
		
	}
	function OnGUI() {
		//draw the background
		GUI.Label (Rect (position.x - 30, position.y - 10, 50, 50), icon);
		GUI.BeginGroup( Rect (position.x, position.y, size.x, size.y));
			GUI.Box ( Rect(0,0, size.x, size.y), emptyBar);
			
			//draw the filled-in part
			GUI.BeginGroup ( Rect(0,0, curEnergy, size.y));
				GUI.Box (Rect (0, 0, size.x, size.y), fullBar);
			GUI.EndGroup ();
		GUI.EndGroup ();



	}
	function Update() {
		
		//The Rover isn't in any cavelight
		if(!roverControl.inCavelight) {
			//We lose Energy at a defined Rate
			//changes have been moved to ThirdPersonController.js
			if (curEnergy > maxEnergy) {
					curEnergy = maxEnergy;
				} 
            isCharging = false;
        }
		else {
			//The Rover is in Cavelight				
			if(curEnergy < maxEnergy) {
                isCharging = true;
				curEnergy += rechargeRate;
			} else {
				curEnergy = maxEnergy;
                isCharging = false;
		}
	}
	
	if(curEnergy < 0) {
		//Game Over
		//Need this check here for testing
		curEnergy = 0;
		Application.LoadLevel("mainMenu");
	}

}