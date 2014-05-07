#pragma strict

var pitchMinimum:float = -4.0;
var pitchMaximim:float = 1.0;
var roverBody:Rigidbody;
var speedMax:float = 13.0;
var currentSpeed:float;

private var pitchModifier:float;

@script RequireComponent(AudioSource)
function Start() {
    audio.pitch = pitchMinimum;
}
function Awake() {
    if(GetComponent(Rigidbody) != null){
        roverBody = GetComponent(Rigidbody);
        roverBody.freezeRotation = true;
    }else{
        Debug.LogError("MotorAudio needs a rigidbody to calculate audio");
    }
}

function Update() {
    currentSpeed = roverBody.velocity.magnitude;
    pitchModifier = pitchMaximim - pitchMinimum;
    audio.pitch = pitchMinimum + (currentSpeed/speedMax)*pitchModifier;          
}