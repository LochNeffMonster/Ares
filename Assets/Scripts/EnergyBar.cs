using UnityEngine;
using System.Collections;

public class EnergyBar : MonoBehaviour {

	public GameObject roverObj; //For its transform and location
	private float curEnergy = 200;
	private float maxEnergy = 200;
	private Vector2 position = new Vector2(50, 50);
	private Vector2 size = new Vector2(200, 20);
	
	private float barDisplay = 1;
	public Texture2D emptyBar;
	public Texture2D fullBar;
	public Texture2D icon;
	private float decayRate = 0.05f;

	void OnGUI() {
		//draw the background
		GUI.Label (new Rect (position.x - 30, position.y - 10, 50, 50), icon);
		GUI.BeginGroup (new Rect (position.x, position.y, size.x, size.y));
			GUI.Box (new Rect(0,0, size.x, size.y), emptyBar);
			
			//draw the filled-in part
			GUI.BeginGroup (new Rect(0,0, curEnergy, size.y));
				GUI.Box (new Rect (0, 0, size.x, size.y), fullBar);
			GUI.EndGroup ();
		GUI.EndGroup ();



	}
	void Update() {
		//barDisplay =((float)Time.time * 0.05f);
		if (curEnergy > maxEnergy) {
				curEnergy = maxEnergy;
			} else {
				curEnergy -= decayRate;
			}
	}
}
