document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelectorAll('.grid-item');
    const audioMap = new Map();
    const keys = [];
    const audio = [];
  
    for (let i = 97; i <= 122; i++) {
      keys.push(String.fromCharCode(i));
      let sound = new Audio(`sounds/${String.fromCharCode(i)}__.mp3`);
      audio.push(sound);
    }
  
    for(let i = 0; i < keys.length;i++) {
      audioMap.set(keys[i], audio[i]);
    }
    
    console.log(audioMap);
  
    grid.forEach(item => {
      item.addEventListener('click', () => {
        console.log("clicked");
        const id = item.id;
        console.log(id);
        const audioElement = audioMap.get(id);
        console.log(audioElement);
        if (audioElement) {
          audioElement.play();
        }
      });
    });

    let inputElement = document.getElementById("search")
    inputElement.addEventListener("input", function() {
   
      let inputVal = inputElement.value;
      let myArray = inputVal.split("");
    
      let outputElement = document.getElementById("output");
      outputElement.innerHTML = "";

      for(let i = 0; i < myArray.length; i++) {
        outputElement.innerHTML += `<button id='button-box-${i}' value='${myArray[i]}'>${myArray[i]}</button>`;
      }
      
      let buttonBox = document.querySelectorAll("[id^='button-box-']");
      let lastButtonIndex = myArray.length - 1; // Get the index of the last button
      buttonBox.forEach((item, index) => {
        item.addEventListener('click', () => {
          console.log("clicked");
          const id = item.value;
          const audioElement = audioMap.get(id);
          if (audioElement) {
            audioElement.play();
          }
          if (index === lastButtonIndex) { // Check if this is the last button in the sequence
            item.disabled = true; // Disable the last button
            setTimeout(function() {
              const message = new SpeechSynthesisUtterance(inputVal);
              speechSynthesis.speak(message);
              buttonBox.forEach(button => {
                button.disabled = false; // Re-enable all the buttons
              });
            }, 1000);
          }
        });
      });

    });
    
   
    
     
  });
  
