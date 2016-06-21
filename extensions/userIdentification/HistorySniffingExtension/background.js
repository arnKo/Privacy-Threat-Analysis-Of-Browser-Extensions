function send(storage) {
	console.log(storage);
}

function addVisitItems(storage, isLast) {
	chrome.history.getVisits({ 'url': storage.url }, function(visitItems) {
		storage.visits = visitItems;
		if(isLast) {
			send(historySniffingStorage);
		}
	});
}

var historySniffingStorage = [];
chrome.history.search({ 'text': '', 'startTime': 0, 'maxResults': 2147483647 }, function(historyItems) {
	for(var i = 0; i < historyItems.length; i++) {
		var storage = { 'url': historyItems[i].url, 'visits': [] };
		historySniffingStorage.push(storage);
		addVisitItems(storage, i === historyItems.length - 1);
	}
});

