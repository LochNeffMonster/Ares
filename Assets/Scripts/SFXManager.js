#pragma strict

public var confirmPing : AudioClip;
public var sfxSource : AudioSource;
public var listener:AudioListener;
public var listenerObject:GameObject;

function Awake () {
    DontDestroyOnLoad(gameObject);
    sfxSource = gameObject.AddComponent(AudioSource);
    confirmPing = Resources.Load("Audio/ConfirmPing") as AudioClip;
    listener = FindObjectOfType(AudioListener);
    listenerObject = listener.gameObject;
    gameObject.transform.position = listenerObject.transform.position;
}

function Start () {
    sfxSource.clip = confirmPing;
    sfxSource.Play();

}

function PlayConfirmPing(){
    audio.Play();
}

function RequestPing(){
    PlayConfirmPing();
}

function OnLevelWasLoaded (level : int) {
    listener = FindObjectOfType(AudioListener);
    listenerObject = listener.gameObject;
    gameObject.transform.position = listenerObject.transform.position;
}