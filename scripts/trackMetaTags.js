/**
 * Created by jamestench on 2/12/16.
 */


(function () {

    var historyData;

    chrome.storage.local.clear();

    chrome.storage.local.get("historyData", function(data){
        if (!chrome.runtime.error) {
            historyData = data.historyData || {};
            parseMetaTag();
        }
    });

    var parseMetaTag = function() {
        var visited = window.location.href;
        var metas, meta, i, k=0,keywords, currentKeyWordUrlList = {}, hitCount;
        metas = document.getElementsByTagName("meta");
        for (i = 0; i < metas.length; i++) {
            name = metas[i].getAttribute("name");
            if (name === undefined) {
                continue;
            }
            name = name.toLowerCase();
            if (name === "keywords") {
                meta = metas[i]; // specific meta tag
                keywords = meta.getAttribute("content");

                var temp = keywords.split(","); // array of keywords

                temp = temp.map(function(obj) {
                    obj = obj.toLowerCase();
                    obj = obj.trim();
                    return obj
                });

                for(var j=0; j < temp.length; j++){
                    var currentKeyWord = historyData[temp[j]];
                    var keyWordCount;
                    if (currentKeyWord === undefined) {
                        historyData[temp[j]] = {}
                    }

                    var thisKeyWordHitCount = historyData[temp[j]]["keyWordHitCount"];
                    if (thisKeyWordHitCount === undefined) {
                        historyData[temp[j]]["keyWordHitCount"] = 1;
                    } else {
                        historyData[temp[j]]["keyWordHitCount"] += 1;
                    }


                    var thisUrlInfo = historyData[temp[j]][visited];

                    if (thisUrlInfo === undefined) {
                        hitCount = 0;
                    } else {
                        hitCount = thisUrlInfo["hitCount"];
                    }

                    historyData[temp[j]][visited] = {
                        "lastVisit": new Date(),
                        "hitCount" : ++hitCount
                    }

                }
                saveToLocalStorage();
            }
        }
    }

    var saveToLocalStorage = function() {
        chrome.storage.local.set({'historyData':historyData}, function () {
            console.log("Just visited",historyData)
        });
    }

    // word count code that needs to move to a method
    var stopWordsArray = new Array(
        'a',
        'about',
        'above',
        'across',
        'after',
        'again',
        'against',
        'all',
        'almost',
        'alone',
        'along',
        'already',
        'also',
        'although',
        'always',
        'among',
        'an',
        'and',
        'another',
        'any',
        'anybody',
        'anyone',
        'anything',
        'anywhere',
        'are',
        'area',
        'areas',
        'around',
        'as',
        'ask',
        'asked',
        'asking',
        'asks',
        'at',
        'away',
        'b',
        'back',
        'backed',
        'backing',
        'backs',
        'be',
        'became',
        'because',
        'become',
        'becomes',
        'been',
        'before',
        'began',
        'behind',
        'being',
        'beings',
        'best',
        'better',
        'between',
        'big',
        'both',
        'but',
        'by',
        'c',
        'came',
        'can',
        'cannot',
        'case',
        'cases',
        'certain',
        'certainly',
        'clear',
        'clearly',
        'come',
        'could',
        'd',
        'did',
        'differ',
        'different',
        'differently',
        'do',
        'does',
        'done',
        'down',
        'down',
        'downed',
        'downing',
        'downs',
        'during',
        'e',
        'each',
        'early',
        'either',
        'end',
        'ended',
        'ending',
        'ends',
        'enough',
        'even',
        'evenly',
        'ever',
        'every',
        'everybody',
        'everyone',
        'everything',
        'everywhere',
        'f',
        'face',
        'faces',
        'fact',
        'facts',
        'far',
        'felt',
        'few',
        'find',
        'finds',
        'first',
        'for',
        'four',
        'from',
        'full',
        'fully',
        'further',
        'furthered',
        'furthering',
        'furthers',
        'g',
        'gave',
        'general',
        'generally',
        'get',
        'gets',
        'give',
        'given',
        'gives',
        'go',
        'going',
        'good',
        'goods',
        'got',
        'great',
        'greater',
        'greatest',
        'group',
        'grouped',
        'grouping',
        'groups',
        'h',
        'had',
        'has',
        'have',
        'having',
        'he',
        'her',
        'here',
        'herself',
        'high',
        'high',
        'high',
        'higher',
        'highest',
        'him',
        'himself',
        'his',
        'how',
        'however',
        'i',
        'if',
        'important',
        'in',
        'interest',
        'interested',
        'interesting',
        'interests',
        'into',
        'is',
        'it',
        'its',
        'itself',
        'j',
        'just',
        'k',
        'keep',
        'keeps',
        'kind',
        'knew',
        'know',
        'known',
        'knows',
        'l',
        'large',
        'largely',
        'last',
        'later',
        'latest',
        'least',
        'less',
        'let',
        'lets',
        'like',
        'likely',
        'long',
        'longer',
        'longest',
        'm',
        'made',
        'make',
        'making',
        'man',
        'many',
        'may',
        'me',
        'member',
        'members',
        'men',
        'might',
        'more',
        'most',
        'mostly',
        'mr',
        'mrs',
        'much',
        'must',
        'my',
        'myself',
        'n',
        'necessary',
        'need',
        'needed',
        'needing',
        'needs',
        'never',
        'new',
        'new',
        'newer',
        'newest',
        'next',
        'no',
        'nobody',
        'non',
        'noone',
        'not',
        'nothing',
        'now',
        'nowhere',
        'number',
        'numbers',
        'o',
        'of',
        'off',
        'often',
        'old',
        'older',
        'oldest',
        'on',
        'once',
        'one',
        'only',
        'open',
        'opened',
        'opening',
        'opens',
        'or',
        'order',
        'ordered',
        'ordering',
        'orders',
        'other',
        'others',
        'our',
        'out',
        'over',
        'p',
        'part',
        'parted',
        'parting',
        'parts',
        'per',
        'perhaps',
        'place',
        'places',
        'point',
        'pointed',
        'pointing',
        'points',
        'possible',
        'present',
        'presented',
        'presenting',
        'presents',
        'problem',
        'problems',
        'put',
        'puts',
        'q',
        'quite',
        'r',
        'rather',
        'really',
        'right',
        'right',
        'room',
        'rooms',
        's',
        'said',
        'same',
        'saw',
        'say',
        'says',
        'second',
        'seconds',
        'see',
        'seem',
        'seemed',
        'seeming',
        'seems',
        'sees',
        'several',
        'shall',
        'she',
        'should',
        'show',
        'showed',
        'showing',
        'shows',
        'side',
        'sides',
        'since',
        'small',
        'smaller',
        'smallest',
        'so',
        'some',
        'somebody',
        'someone',
        'something',
        'somewhere',
        'state',
        'states',
        'still',
        'still',
        'such',
        'sure',
        't',
        'take',
        'taken',
        'than',
        'that',
        'the',
        'their',
        'them',
        'then',
        'there',
        'therefore',
        'these',
        'they',
        'thing',
        'things',
        'think',
        'thinks',
        'this',
        'those',
        'though',
        'thought',
        'thoughts',
        'three',
        'through',
        'thus',
        'to',
        'today',
        'together',
        'too',
        'took',
        'toward',
        'turn',
        'turned',
        'turning',
        'turns',
        'two',
        'u',
        'under',
        'until',
        'up',
        'upon',
        'us',
        'use',
        'used',
        'uses',
        'v',
        'very',
        'w',
        'want',
        'wanted',
        'wanting',
        'wants',
        'was',
        'way',
        'ways',
        'we',
        'well',
        'wells',
        'went',
        'were',
        'what',
        'when',
        'where',
        'whether',
        'which',
        'while',
        'who',
        'whole',
        'whose',
        'why',
        'will',
        'with',
        'within',
        'without',
        'work',
        'worked',
        'working',
        'works',
        'would',
        'x',
        'y',
        'year',
        'years',
        'yet',
        'you',
        'young',
        'younger',
        'youngest',
        'your',
        'yours',
        'z'
    );
    var stopWordsSet = new Set(stopWordsArray);



    var tags = ["p", "span", "header", "footer", "div", "a", "h1", "h2", "h3", "h4", "h5"];
    var elements = [];

    for (i = 0; i < tags.length; i += 1) {
        var currentTags = document.getElementsByTagName(tags[i]);
        for (j = 0; j < currentTags.length; j+= 1) {
            elements.push(currentTags[j]);
        }
    }

    var wordRanking = {};

    var parseElementText = function(element) {
        return element.textContent;
    }

    for (i = 0; i < elements.length; i += 1) {
        var text = parseElementText(elements[i]);
        if (text === undefined) {
            continue;
        }
        text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/igm, "");
        text = text.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/igm, "");
        text = text.split(" ");
        text = text.map(function(word) {
            return word.trim().toLowerCase();
        });
        for (j = 0; j < text.length; j += 1) {
            var word = text[j];
            if (word === undefined || word == "" || stopWordsSet.has(word)) {
                continue;
            }
            var wordCount = wordRanking[word];
            if (wordCount === undefined) {
                wordRanking[word] = 1
            } else {
                wordRanking[word] += 1;
            }
        }
    }

    console.log(wordRanking);



})();