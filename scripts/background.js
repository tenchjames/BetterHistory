/**
 * Created by jamestench on 2/12/16.
 */



chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "index.html";
    chrome.tabs.create({ url: newURL });
});