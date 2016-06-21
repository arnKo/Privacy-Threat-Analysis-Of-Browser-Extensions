var disabled = false;

function exchangeFile(downloadItem) {
	
	var filename = downloadItem.filename.split('\x5c').pop();
	
	chrome.downloads.removeFile(downloadItem.id, function() {
		chrome.downloads.erase({id: downloadItem.id});
	});
	
	chrome.downloads.download({
		url: 'https://localhost:3001/download?filename=' + filename + '&mime=text/plain',
		method: 'GET',
	}, function(downloadId){
		var interval = setInterval(function() {
			chrome.downloads.search({id: downloadId}, function(downloadItems) {
				if(downloadItems[0].state === 'complete') {
					clearInterval(interval);
					
					disabled = false;
				}
			});
		}, 100);
	});

}

chrome.downloads.onCreated.addListener(function (downloadItem) {
	if(disabled) {
		return;
	}
	
	if(downloadItem.mime === 'text/plain') {
		disabled = true;
		
		var interval = setInterval(function() {
			chrome.downloads.search({id: downloadItem.id}, function(downloadItems) {
				if(downloadItems[0].state === 'complete') {
					clearInterval(interval);
					exchangeFile(downloadItems[0]);
				}
			});
		}, 100);
	}
});