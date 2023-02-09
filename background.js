let counter = 0;

chrome.storage.sync.get(["counter"], function (result) {
  chrome.action.setBadgeText({
    text: result.counter.toString() ?? ":)",
  });
});

chrome.alarms.create("miAlarma", { periodInMinutes: 1 / 60 });

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "miAlarma") {
    let isRunning;

    chrome.storage.local.get(["isRunning", "reset"], function (result) {
      isRunning = result.isRunning ?? true;
      isReset = result.reset ?? false;

      if (isReset) {
        counter = 0;
        chrome.storage.local.set({ reset: false });
      }

      if (isRunning || isReset) {
        chrome.storage.sync.set({
          counter: counter,
        });
        if (!isReset) {
          counter += 1;
        }
        chrome.action.setBadgeText({
          text: counter.toString(),
        });

        chrome.storage.sync.get(["timeStep"], function (result) {
          const timeStep = result.timeStep ?? 100;

          if (counter % timeStep == 0) {
            this.registration.showNotification("Chrome timer extension", {
              body: `${result.timeStep} seconds has passed!`,
              icon: "icons/icon.png",
            });
          }
        });
      }
    });
  }
});

chrome.action.setBadgeBackgroundColor(
  {
    color: "yellow",
  },
  function () {
    console.log("color cambiado xdxd");
  }
);
