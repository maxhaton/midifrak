//Try to load WebAudio
try {
    var ctx = new AudioContext();
  } catch {
    document.getElementById("webAudioSupport")
      .innerText = "Web Audio Initialization failed, proceed with caution";
  }
  //Try to load Web Midi
  function fail(obj) {
    document.getElementById("webMidiSupport")
      .innerText = "Web Midi Initialization failed, proceed with caution";
  }
  navigator.requestMIDIAccess().then(null, fail);
  //Enter-press event.
  
  function dispatch(event: KeyboardEvent)
  {   
    let innerMe = document.getElementById("searchOrNew");
    //event.preventDefault();
    if(event.keyCode == 13)
    {
        alert("Enter");
        //No input, new vis
        let str = (innerMe as HTMLInputElement).value;
        console.log(str);
        if(str.length == 0) {
            window.location.href = 'newdesign.html';
        } else {
            alert("Storage not implemented yet: ");
        }
    }
  }

window.onload = function() {    
    document.getElementById('searchOrNew').addEventListener("keypress",dispatch);
}

  
 