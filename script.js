let countdownInterval;
let totalSeconds;
let isPaused = false;

// Start countdown timer with given minutes
function startCountdown(minutes) {
  totalSeconds = minutes * 60;
  isPaused = false;
  updateDisplay();
  
  countdownInterval = setInterval(() => {
    if (!isPaused && totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
      
      // Play alarm when timer reaches 00:00
      if (totalSeconds === 0) {
        playAlarm();
        clearInterval(countdownInterval);
      }
    }
  }, 1000);
}

// Update timer display with current time
function updateDisplay() {
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const secs = (totalSeconds % 60).toString().padStart(2, '0');
  document.getElementById('countdown').textContent = `${mins}:${secs}`;
}

// Pause/unpause timer functionality
function pauseTimer() {
  isPaused = !isPaused;
  console.log(isPaused ? 'Timer paused' : 'Timer resumed');
}

// Stop timer immediately
function stopTimer() {
  clearInterval(countdownInterval);
  totalSeconds = 0;
  updateDisplay();
  console.log('Timer stopped');
}

// Restart timer to original selected time
function restartTimer() {
  clearInterval(countdownInterval);
  const time = parseInt(localStorage.getItem("focusTime") || "0");
  if (time > 0) {
    startCountdown(time);
    console.log(`Timer restarted to ${time} minutes`);
  }
}

// Play alarm sound when session ends - INSERT alert.mp3 HERE
function playAlarm() {
  try {
    const audio = new Audio("assets/alert.mp3");
    audio.play();
    console.log('Session completed! Alarm played.');
  } catch (error) {
    console.log('Session completed! (Audio file not found)');
  }
}

// Initialize timer when page loads
window.onload = () => {
  const time = parseInt(localStorage.getItem("focusTime") || "0");
  if (!isNaN(time) && time > 0) {
    startCountdown(time);
  }
};
