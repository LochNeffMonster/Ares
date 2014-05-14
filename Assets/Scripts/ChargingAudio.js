#pragma strict

public var sfxSource : AudioSource;
public var chargeSound : AudioClip;
public var shutdownSound : AudioClip;
public var pitchMax:float = 4.0f;
public var pitchMin:float = 1.0f;
public var pitchModifier:float = 0.0f;
public var energyMax:float = 0.0f;
public var energyCurrent:float = 0.0f;
public var _roverEnergy:EnergyBar;
private var shutdown:boolean = false;


@script RequireComponent(AudioSource)
@script RequireComponent(EnergyBar)    
// Use this for initialization
function Start () {
    if(gameObject.GetComponent(EnergyBar)){
        _roverEnergy = gameObject.GetComponent(EnergyBar);
        energyMax = _roverEnergy.maxEnergy;
        chargeSound = Resources.Load("Audio/charge_loop") as AudioClip;
        shutdownSound = Resources.Load("Audio/power_off") as AudioClip;
        sfxSource = gameObject.GetComponent(AudioSource);
        sfxSource.clip = chargeSound;
        audio.loop = true;
        audio.priority = 255;
        audio.enabled = false;
    }else{
        Debug.LogError("ChargingAudio needs an EnergyBar to calculate audio");
    }
}
	
// Update is called once per frame
function Update () {
    // only play and modify audio if the rover is charging
    if(_roverEnergy.isCharging){
        // turn audio on if it is not already
        if(!audio.enabled){
            audio.enabled = true;
            audio.Play();
        }
        energyCurrent = _roverEnergy.curEnergy;
        pitchModifier = pitchMax - pitchMin;
        audio.pitch = pitchMin + (energyCurrent/energyMax)*pitchModifier;
    }else if(audio.enabled && !shutdown){
        // if not charging but still playing sound, disable the audiosource
        audio.enabled = false;
    }
    
    if(_roverEnergy.curEnergy == 0f && !shutdown){
        audio.enabled = true;
        sfxSource.clip = shutdownSound;
        audio.pitch = 1.0f;
        audio.loop = false;
        audio.Play();
        shutdown = true;
    }

}
