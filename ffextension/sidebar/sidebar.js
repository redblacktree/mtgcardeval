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


function testEnd(tabs) {
  saveInputValues();
  testVideoTimes(tabs, currentCard.stop - 5, currentCard.stop);
}

const testEndButton = document.querySelector("#testEnd");
testEndButton.addEventListener("click", () => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(testEnd).catch(onError);
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


function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}


function loadCardValues(key, callback) {
  browser.storage.local.get(key).then((data) => {
  if (data[key]) {
    const cardNameInput = document.querySelector('#cardName');
    cardNameInput.value = currentCard.name = data[key].name;
    const startTimeInput = document.querySelector('#startTime');
    startTimeInput.value = currentCard.start = data[key].start;
    const stopTimeInput = document.querySelector('#stopTime');
    stopTimeInput.value = currentCard.stop = data[key].stop;
  }
  callback();
});
}


function cardTest(event) {
  event.preventDefault();
  const key = event.target.getAttribute('data-key');

  loadCardValues(key, () => {
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then(test).catch(onError);
  });
}

function updateDisplay() {
  const dataDisplay = document.querySelector("#data");
  dataDisplay.innerHTML = "";
  browser.storage.local.get(null).then((data) => {
    for (const key of Object.keys(data)) {
      if (key !== 'videoId') {
        let link = createElementFromHTML(`<a href="#" data-key="${key}">${key}: ${data[key].start} - ${data[key].stop}</a>`);
        link.addEventListener('click', cardTest);
        dataDisplay.appendChild(link);
        dataDisplay.appendChild(document.createElement('br'));
      }
    }
    const datacopy = document.querySelector("#datacopy");
    datacopy.innerHTML = JSON.stringify(data);
  });
}

const saveButton = document.querySelector("#save");
saveButton.addEventListener("click", () => {
  let storage = {};
  saveInputValues();
  browser.storage.local.get(currentCard.name).then((data) => {
    if (data[currentCard.name]) {
      currentCard.name += '2';
      const cardNameInput = document.querySelector('#cardName');
      cardNameInput.value = currentCard.name;
    }
    storage[currentCard.name] = currentCard;

    if (cardName !== '') {
      browser.storage.local.set(storage);
    } else {
      // do nothing if no card name provided
    }
    updateDisplay();
  });
});

updateDisplay();