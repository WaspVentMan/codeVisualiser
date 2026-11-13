var audioCtx = {}

function playNote(frequency, duration) {
  // create Oscillator node
  var oscillator = audioCtx.createOscillator();
  var gain = audioCtx.createGain();

  gain.gain.value = 0.1;

  oscillator.type = 'square';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.gain
  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
    }, duration);
}

async function visualise() {
    let linesPrinted = 0
    audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    for (let file in files){
        let lines = files[file]

        for (let x = 0; x < lines.length; x++){
            let indent = lines[x].search(/\S|$/)
            document.querySelector(".codeViewer").innerHTML += `<div style="width: ${lines[x].length-indent}px; margin-left: ${indent}px; height: 1px; background-color: black;"></div>`
            document.querySelector(".codeViewer2").innerHTML += `<div style="width: ${(lines[x].length-indent)*8}px; margin-left: ${indent*8}px; height: 8px; background-color: black;"></div>`

            document.querySelector(".codeViewer").style.height = `${window.innerHeight}px`
            if (document.querySelector(".codeViewer").childNodes.length > window.innerHeight){
                document.querySelector(".codeViewer").childNodes[0].remove()
            }

            document.querySelector(".codeViewer2").style.height = `${window.innerHeight}px`
            if (document.querySelector(".codeViewer2").childNodes.length > window.innerHeight/8){
                document.querySelector(".codeViewer2").childNodes[0].remove()
            }

            linesPrinted++

            document.querySelector(".stats").textContent = linesPrinted + " Lines Displayed"

            window.scrollTo(0, 1e300)
            if (x%100==0 || true){
                playNote(lines[x].length-indent+25, 25)
                await wait(0)
            }
        }
        //await wait(0)
    }
}