document.addEventListener("DOMContentLoaded", function () {
    var timerDisplay = document.getElementById("Timer");
    var startButton = document.querySelector(".btn1");
    var pauseButton = document.querySelector(".btn2");
    var lapButton = document.querySelector(".btn3");
    var resetButton = document.querySelector(".btn4");
    var lapsList = document.getElementById("lapsList");

    var isRunning = false;
    var interval;
    var milliseconds = 0;
    var seconds = 0;
    var minutes = 0;
    var hours = 0;

    function formatTime() {
        return (
            (hours < 10 ? "0" : "") + hours + ":" +
            (minutes < 10 ? "0" : "") + minutes + ":" +
            (seconds < 10 ? "0" : "") + seconds + ":" +
            (milliseconds < 10 ? "00" : (milliseconds < 100 ? "0" : "")) + milliseconds
        );
    }

    // Update timer display function
    function updateDisplay() {
        timerDisplay.value = formatTime();
    }

    // Start button click event
    startButton.addEventListener("click", function () {
        if (!isRunning) {
            isRunning = true;
            interval = setInterval(function () {
                milliseconds += 10;

                if (milliseconds >= 1000) {
                    seconds++;
                    milliseconds = 0;
                }

                if (seconds >= 60) {
                    minutes++;
                    seconds = 0;
                }

                if (minutes >= 60) {
                    hours++;
                    minutes = 0;
                }

                updateDisplay();
            }, 10);
        }
    });

    // Pause button click event
    pauseButton.addEventListener("click", function () {
        if (isRunning) {
            isRunning = false;
            clearInterval(interval);
        }
    });

    // Lap button click event
    lapButton.addEventListener("click", function () {
        if (isRunning) {
            var lapItem = document.createElement("li");
            lapItem.textContent = "Lap : " + formatTime();
            lapsList.appendChild(lapItem);
        }
    });

    // Reset button click event
    resetButton.addEventListener("click", function () {
        isRunning = false;
        clearInterval(interval);
        milliseconds = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateDisplay();
        lapsList.innerHTML = ""; 
    });
});