

(function() {



    //chrome.storage.local.set({"testKey": "someTestValue"},
    //    function(objects) {
    //        // do nothing for now
    //    });
    //


    chrome.storage.local.get("visitedPages", function(data){
        if (!chrome.runtime.error) {
            console.log(data.visitedPages);
        }
    });


    //var testChromeApi = function() {
    //    var api = chrome.history;
    //    api.search({
    //        "text": ""
    //    }, function(historyItem) {
    //        console.log(historyItem);
    //    });
    //
    //
    //    api.getVisits({"url": "https://google.com"}, function(results){
    //        console.log(results);
    //    })
    //}
    //testChromeApi();
})();