chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"contentScript.js"});
}, {url: [{urlMatches : 'https://marketplace.axieinfinity.com/axie/*'}]});

