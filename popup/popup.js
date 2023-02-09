const timerElement = document.querySelector("#timer");
const nameElement = document.querySelector("#name");
const counterElement = document.querySelector("#counter");

const btnStart = document.querySelector("#start-timer");
const btnStop = document.querySelector("#stop-timer");
const btnReset = document.querySelector("#reset-timer");

const updateTime = () => {
  const time = new Date().toLocaleTimeString();
  timerElement.innerText = `The time is: ${time}`;

  chrome.storage.sync.get(["counter"], function (result) {
    counterElement.innerText = `the timer is at: ${result.counter}`;
  });
};

updateTime();
setInterval(updateTime, 1000);

chrome.storage.sync.get(["name"], (result) => {
  const name = result.name ?? "???";
  nameElement.innerText = `Your name is: ${name}`;
});

btnStart.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

btnStop.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});

btnReset.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
    reset: true,
  });
});
