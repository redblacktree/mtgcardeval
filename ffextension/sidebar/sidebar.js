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
  const cardGradeInput = document.querySelector('#cardGrade');
  currentCard.grade = cardGradeInput.value;
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
  testVideoTimes(tabs, currentCard.stop - 3, currentCard.stop);
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
    const cardGradeInput = document.querySelector("#cardGrade");
    cardGradeInput.value = currentCard.grade = data[key].grade;
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

  loadCardValues(key);
}

function updateDisplay() {
  const dataDisplay = document.querySelector("#data");
  const scrollTop = dataDisplay.scrollTop;
  dataDisplay.innerHTML = "";

  browser.storage.local.get(null).then((data) => {
    for (const key of Object.keys(data)) {
      if (key !== 'videoId') {
        let link = createElementFromHTML(`<a href="#" data-key="${key}">${key}: ${data[key].start} - ${data[key].stop} - ${data[key].grade}</a>`);
        link.addEventListener('click', cardTest);
        dataDisplay.appendChild(link);
        dataDisplay.appendChild(document.createElement('br'));
      }
    }
    dataDisplay.scrollTop = scrollTop;
    const datacopy = document.querySelector("#datacopy");
    datacopy.value = JSON.stringify(data);
  });
}

saveData = (event) => {
  let storage = {};
  saveInputValues();
  browser.storage.local.get(currentCard.name).then((data) => {
    if (data[currentCard.name] && event.target.id === 'save') {
      currentCard.name += '2';
      const cardNameInput = document.querySelector('#cardName');
      cardNameInput.value = currentCard.name;
    }
    storage[currentCard.name] = currentCard;

    browser.storage.local.get('videoId').then((data) => {
      currentCard.videoId = data.videoId;
      storage[currentCard.name] = currentCard;
      browser.storage.local.set(storage).then(() => {
        const cardNameInput = document.querySelector('#cardName');
        const cardGradeInput = document.querySelector('#cardGrade');
        const startTimeInput = document.querySelector('#startTime');
        const stopTimeInput = document.querySelector("#stopTime");
        updateDisplay();
        startTimeInput.value = stopTimeInput.value;
        cardNameInput.value = '';
        cardGradeInput.value = '';
      });
    });
  });
};

const saveButton = document.querySelector("#save");
saveButton.addEventListener("click", saveData);

const overwriteButton = document.querySelector("#overwrite");
overwriteButton.addEventListener("click", saveData);

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
  browser.storage.local.remove(currentCard.name).then(() => {
    updateDisplay();
  });
});

const loadButton = document.querySelector("#load");
loadButton.addEventListener("click", () => {
  browser.storage.local.clear().then(() => {
    browser.storage.local.set(JSON.parse(datacopy.value)).then(() => {
      updateDisplay();
    });
  });
});

const startMinusButton = document.querySelector("#startMinus");
startMinusButton.addEventListener("click", () => {
  const input = document.querySelector('#startTime');
  input.value = input.value - 0.5;
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(test).catch(onError);
});

const startPlusButton = document.querySelector("#startPlus");
startPlusButton.addEventListener("click", () => {
  const input = document.querySelector('#startTime');
  input.value = parseFloat(input.value) + 0.5;
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(test).catch(onError);
});

const stopMinusButton = document.querySelector("#stopMinus");
stopMinusButton.addEventListener("click", () => {
  const input = document.querySelector('#stopTime');
  input.value = input.value - 0.5;
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(testEnd).catch(onError);
});

const stopPlusButton = document.querySelector("#stopPlus");
stopPlusButton.addEventListener("click", () => {
  const input = document.querySelector('#stopTime');
  input.value = parseFloat(input.value) + 0.5;
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(testEnd).catch(onError);
});

function addToGrade(event) {
  const input = document.querySelector('#cardGrade');
  input.value = input.value.concat(event.target.innerText);
  input.focus();
}
["#gradeBA", "#gradeSB", "#gradeA", "#gradeB", "#gradeC", "#gradeD", "#gradeF",].forEach((selector) => {
  const gradeChangeButton = document.querySelector(selector);
  gradeChangeButton.addEventListener("click", addToGrade);
});

updateDisplay();