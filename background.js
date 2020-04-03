chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"contentScript.js"});
    //console.log("historyupdate");
}, {url: [{urlMatches : 'https://marketplace.axieinfinity.com/axie/*'}]});

chrome.tabs.onActivated.addListener(function(info) {
    //console.log("onActivated");
    chrome.tabs.get(info.tabId, function(tab) { 
        //console.log(tab);
        if (tab.url && tab.url.lastIndexOf("https://marketplace.axieinfinity.com/axie/", 0) === 0) { 
            //console.log("executeScript");
            chrome.tabs.executeScript(null,{file:"contentScript.js"});
        } 
    }); 
});
