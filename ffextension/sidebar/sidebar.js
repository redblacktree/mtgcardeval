let currentCard = {};

function onError(error) {
  console.error(`Error: ${error}`);
}


function testVideoTimes(tabs, start, stop) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {action: "testVideoTimes", startTime: start, stopTime: stop}
    ).then(response => {
      console.log(response);
    }).catch(onError);
  }
}

function cardTest(event) {
  console.log(event.target);
  event.preventDefault();
}

function saveInputValues() {
  const cardNameInput = document.querySelector('#cardName');
  currentCard.name = cardNameInput.value;
  const startInput = document.querySelector('#startTime');
  currentCard.start = startInput.value;
  const stopInput = document.querySelector('#stopTime');
  currentCard.stop = stopInput.value;
}

function test(tabs) {
  saveInputValues();
  testVideoTimes(tabs, currentCard.start, currentCard.stop);
}
const testButton = document.querySelector("#test");
testButton.addEventListener("click", () => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(test).catch(onError);
});


function resetData() {
  browser.storage.local.clear();
}
const resetDataButton = document.querySelector("#resetData");
resetDataButton.addEventListener("click", () => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(resetData).catch(onError);
});


function getVideoId(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {action: "getVideoId"}
    ).then(response => {
      currentCard.videoId = response.response;
      browser.storage.local.set({videoId: response.response});
    }).catch(onError);
  }
}
const getIdButton = document.querySelector("#getId");
getIdButton.addEventListener("click", () => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(getVideoId).catch(onError);
});


function requestStopTime(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {action: "getCurrentTime"}
    ).then(response => {
      currentCard.stop = response.response;
      const input = document.querySelector('#stopTime');
      console.log(input);
      input.value = response.response;
    }).catch(onError);
  }
}
const stopButton = document.querySelector("#stop");
stopButton.addEventListener("click", () => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(requestStopTime).catch(onError);
});


function requestStartTime(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {action: "getCurrentTime"}
    ).then(response => {
      currentCard.start = response.response;
      const input = document.querySelector('#startTime')
      input.value = response.response;
    }).catch(onError);
  }
}
const startButton = document.querySelector("#start");
startButton.addEventListener("click", () => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(requestStartTime).catch(onError);
});


const saveButton = document.querySelector("#save");
saveButton.addEventListener("click", () => {
  let storage = {};
  saveInputValues();
  storage[currentCard.name] = currentCard;

  if (cardName !== '') {
    browser.storage.local.set(storage);
  }
  else {
    // do nothing if no card name provided
  }
  const dataDisplay = document.querySelector("#data");
  browser.storage.local.get(null).then((data) => {
    let html = '';
    for (const key of Object.keys(data)) {
      if (key !== 'videoId') {
        html += `<a href="#" onclick="cardTest(event)">${key}: ${data[key].start}</a><br>`
      }
    }
    const datacopy = document.querySelector("#datacopy");
    datacopy.innerHTML = JSON.stringify(data);
    dataDisplay.innerHTML = html;
  });
});

