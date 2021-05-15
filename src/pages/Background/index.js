console.log('This is the background page.');
console.log('Put the background scripts here.');

// setInterval(() => console.log('poll'), 3 * 1000);

function openOrFocusOptionsPage() {
  const optionsUrl = chrome.extension.getURL('options.html');
  chrome.tabs.query({}, function (extensionTabs) {
    let found = false;
    for (let i = 0; i < extensionTabs.length; i++) {
      if (optionsUrl === extensionTabs[i].url) {
        found = true;
        chrome.tabs.update(extensionTabs[i].id, { highlighted: true });
      }
    }
    if (found === false) {
      chrome.tabs.create({ url: 'options.html' });
    }
  });
}

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function (tab) {
  openOrFocusOptionsPage();
});

chrome.runtime.onInstalled.addListener((object) => {
  if (chrome.runtime.OnInstalledReason.INSTALL === object.reason) {
    chrome.tabs.create({ url: 'options.html' });
  }
});

chrome.runtime.onMessage.addListener((text) => {
  console.log(`text`, text);
  // Will post the the request url
  fetch('http://localhost:4000/graphql', {
    method: 'POST',
    body: text,
  })
    .then((res) => console.log(`res`, res))
    .catch((err) => console.error(err));
  return true;
});
