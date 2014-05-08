using UnityEngine;
using System.Collections;

public class NewThirdPersonCamera : MonoBehaviour {
	public float distanceAway;
	public float distanceUp;
	public float smooth;
	public Transform followXform;
	public Vector3 targetPosition;
	public Vector3 offset = new Vector3(0.0f, 1.5f, 0.0f);
	public Vector3 lookDirection;
	private Vector3 velocityCamSmooth = Vector3.zero;
	private float camSmoothDampTime = 0.1f;

	// Use this for initialization
	void Start () {
		followXform = GameObject.FindWithTag ("Player").transform;
	}

	void LateUpdate () {

		Vector3 roverOffset = followXform.position + offset;

		lookDirection = roverOffset - this.transform.position;
		lookDirection.y = 0;
		lookDirection.Normalize ();
		//Debug.DrawRay (this.transform.position, lookDirection, Color.red);

		//targetPosition = followXform.position + Vector3.up * distanceUp - followXform.forward * distanceAway;
		targetPosition = roverOffset + followXform.up * distanceUp - lookDirection * distanceAway;
		//Debug.DrawRay (followXform.position, Vector3.up * distanceUp, Color.red);
		//Debug.DrawRay (followXform.position, -1f * followXform.forward * distanceAway, Color.blue);
		//Debug.DrawLine (followXform.position, targetPosition, Color.green);

		compensateTerrainCollision (roverOffset, ref targetPosition);
		//transform.position = Vector3.Lerp (transform.position, targetPosition, Time.deltaTime * smooth);
		smoothPosition (this.transform.position, targetPosition);

		transform.LookAt (followXform);
	}

	void smoothPosition(Vector3 from, Vector3 to) {
		this.transform.position = Vector3.SmoothDamp (from, to, ref velocityCamSmooth, camSmoothDampTime);
	}

	void compensateTerrainCollision(Vector3 from, ref Vector3 to) {
		//Debug.DrawLine (from, to, Color.white);
		RaycastHit hit = new RaycastHit ();
		if (Physics.Linecast (from, to, out hit)) {
			to = new Vector3(hit.point.x, to.y, hit.point.z); 
			}
}
}