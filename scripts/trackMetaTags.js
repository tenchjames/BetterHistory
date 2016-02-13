/**
 * Created by jamestench on 2/12/16.
 */


(function () {
    var visited = window.location.href;
    var time = +new Date();
    chrome.storage.sync.set({'visitedPages':{pageUrl:visited,time:time}}, function () {
        console.log("Just visited",visited)
    });
})();