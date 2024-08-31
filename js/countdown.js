// Function to get the next Sunday
function getNextSunday() {
  const today = new Date();
  const nextSunday = new Date("2024-07-31");

  return nextSunday;
}

// Set the date we're counting down to
const countDownDate = getNextSunday().getTime();

// Update the count down every 1 second
const x = setInterval(function () {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  document.getElementById("enddate").innerHTML = new Date(countDownDate).toLocaleDateString();

  // Time calculations for days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in an element with id="timer"
  // You can create this element in your HTML
  document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the countdown is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Competition ended!";
  }
}, 1000);
