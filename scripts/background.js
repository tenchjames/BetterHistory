/**
 * Created by jamestench on 2/12/16.
 */

if (localStorage.betterHistoryStorage) {
    betterHistoryStorage = JSON.parse(localStorage.betterHistoryStorage);
} else {
    betterHistoryStorage = {};
}

chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "index.html";
    chrome.tabs.create({ url: newURL });
});

chrome.storage.onChanged.addListener(function (changes,areaName) {
    console.log("New item in storage",changes.visitedPages.newValue);
});

chrome.runtime.onMessage.addListener(function(request, sender, senderResponse) {
    if (request.tags) {
        console.log(request.tags);
    }
    chrome.storage.local.set({"tags": "tag1 tag2"}, function(results) {
       console.log(results);
    });
    senderResponse({});
})