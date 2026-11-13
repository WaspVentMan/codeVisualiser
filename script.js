var audioCtx = {}
let options = {
    "noteDuration": 25,
    "waveType": "square",
    "renderGaps": false,
    "renderInfo": true
}

function applySettings(){
    options.noteDuration = parseInt(document.querySelector(".noteDuration").value)
    options.waveType = document.querySelector(".waveType").value
    options.renderGaps = document.querySelector(".renderGaps").checked
    options.renderInfo = document.querySelector(".renderInfo").checked
}

function playNote(frequency, duration) {
  // create Oscillator node
  var oscillator = audioCtx.createOscillator();
  var gain = audioCtx.createGain();

  gain.gain.value = 0.1;

  oscillator.type = options.waveType;
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
    applySettings()

    let linesPrinted = 0
    let filesPrinted = 0
    let currentFile = ""
    audioCtx = new(window.AudioContext || window.webkitAudioContext)();

    for (let x = 0; x < window.innerHeight; x++){
        document.querySelector(".codeViewer").innerHTML += `<div style="display: flex; height: 1px;"></div>`
        document.querySelector(".codeViewer2").innerHTML += `<div style="display: flex; height: 8px;"></div>`
    }

    for (let file in files){
        let lines = files[file]

        currentFile = filenames[file].split("\\")
        currentFile = currentFile[currentFile.length-1]

        for (let x = 0; x < lines.length; x++){
            let indent = lines[x].search(/\S|$/)

            if (options.renderGaps){
                let lineNoIndent = lines[x].slice(indent)

                let lineSplit = lineNoIndent.split(" ")

                let visualLine = ""
                let visualLine2 = ""

                for (let x = 0; x < lineSplit.length; x++){
                    visualLine += `<div style="width: ${lineSplit[x].length}px; margin-left: 1px; height: 1px; background-color: black;"></div>`
                    visualLine2 += `<div style="width: ${lineSplit[x].length*8}px; margin-left: 8px; height: 8px; background-color: black;"></div>`
                }

                document.querySelector(".codeViewer").innerHTML += `<div style="display: flex; height: 1px; margin-left: ${indent-1}px">${visualLine}</div>`
                document.querySelector(".codeViewer2").innerHTML += `<div style="display: flex; height: 8px; margin-left: ${(indent-1)*8}px">${visualLine2}</div>`
            } else {
                document.querySelector(".codeViewer").innerHTML += `<div style="width: ${lines[x].length-indent}px; margin-left: ${indent}px; height: 1px; background-color: black;"></div>`
                document.querySelector(".codeViewer2").innerHTML += `<div style="width: ${(lines[x].length-indent)*8}px; margin-left: ${indent*8}px; height: 8px; background-color: black;"></div>`
            }

            while (document.querySelector(".codeViewer").childNodes.length > window.innerHeight){
                document.querySelector(".codeViewer").childNodes[0].remove()
            }

            while (document.querySelector(".codeViewer2").childNodes.length > window.innerHeight/8){
                document.querySelector(".codeViewer2").childNodes[0].remove()
            }

            linesPrinted++

            if (options.renderInfo){
                document.querySelector(".stats").innerHTML = linesPrinted + " Lines Displayed<br>" + filesPrinted + " Files Displayed<br>Displaying: " + currentFile
            }

            if (x%100==0 || true){
                playNote(lines[x].length-indent, options.noteDuration)
                await wait(0)
            }
        }
        filesPrinted++
    }
}