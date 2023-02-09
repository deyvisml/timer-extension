const nameElement = document.querySelector("#name");
const timeStepElement = document.querySelector("#time-step");
const btnSaveElement = document.querySelector("#btn-save");

// Recuperando los ajustes
chrome.storage.sync.get(["name", "timeStep"], (result) => {
  nameElement.value = result.name ?? "???";
  timeStepElement.value = result.timeStep ?? 1000;
});

// Guardando los ajustes
btnSaveElement.addEventListener("click", () => {
  const name = nameElement.value ?? "???";
  const timeStep = timeStepElement.value ?? 1000;

  chrome.storage.sync.set(
    {
      name: name,
      timeStep: timeStep,
    },
    function () {
      console.log("Los elementos se guardaron gaa");
    }
  );
});
