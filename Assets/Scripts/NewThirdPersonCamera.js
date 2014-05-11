
	public var distanceAway : float;
	public var distanceUp : float;
	public var smooth : float;
	public var followXform : Transform;
	public var targetPosition : Vector3;
	public var offset : Vector3 = new Vector3(0.0f, 1.5f, 0.0f);
	public var lookDirection : Vector3;
	private var velocityCamSmooth : Vector3 = Vector3.zero;
	private var camSmoothDampTime : float = 0.1f;

	// Use this for initialization
	function Start () {
		followXform = GameObject.FindWithTag ("Player").transform;
	}

	function LateUpdate () {

		var roverOffset : Vector3 = followXform.position + offset;

		lookDirection = roverOffset - this.transform.position;
		lookDirection.y = 0;
		lookDirection.Normalize ();
		//Debug.DrawRay (this.transform.position, lookDirection, Color.red);

		//targetPosition = followXform.position + Vector3.up * distanceUp - followXform.forward * distanceAway;
		targetPosition = roverOffset + followXform.up * distanceUp - lookDirection * distanceAway;
		//Debug.DrawRay (followXform.position, Vector3.up * distanceUp, Color.red);
		//Debug.DrawRay (followXform.position, -1f * followXform.forward * distanceAway, Color.blue);
		//Debug.DrawLine (followXform.position, targetPosition, Color.green);

		compensateTerrainCollision (roverOffset, targetPosition);
		//transform.position = Vector3.Lerp (transform.position, targetPosition, Time.deltaTime * smooth);
		smoothPosition (this.transform.position, targetPosition);

		transform.LookAt (followXform);
	}

	function smoothPosition(from : Vector3, to: Vector3) {
		this.transform.position = Vector3.SmoothDamp (from, to, velocityCamSmooth, camSmoothDampTime);
	}

	function compensateTerrainCollision(from: Vector3, to : Vector3) {
		//Debug.DrawLine (from, to, Color.white);
		 var hit : RaycastHit;
		if (Physics.Linecast (from, to)) {
			to = new Vector3(hit.point.x, to.y, hit.point.z); 
			}
}
