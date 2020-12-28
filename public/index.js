const socket = io();

let chooseGif = document.getElementById("chooseGif");
let messages = document.getElementById("messages");
let talkBtn = document.getElementById("talkBtn");
let yourChatInput = document.getElementById("yourChat");

talkBtn.addEventListener("click",ISay(messages.value));

yourChatInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      ISay();        
    }
  });

function ISay(message)  {
    if (message) {
        socket.emit("newchat",{message:message,voice:voiceSelect.selectedIndex});
        yourChatInput.value = '';
    }
}


socket.on("newchat", (chatInfo) => {
    var msg = new SpeechSynthesisUtterance();
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    msg.text = 'Hello World';
    msg.lang = 'en-US';
    msg.onend = function(e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
   // console.log(chatInfo.voice);
    //console.log(voices[chatInfo.voice])
    msg.voice = voices[chatInfo.voice] 
    msg.text = chatInfo.message
    //console.log(msg);
    speechSynthesis.speak(msg);
});