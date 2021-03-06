var state = "idle";
var downloadItem;

function open() {
	state = 'open';
	
    console.log('open');
	chrome.downloads.open(downloadItem.id);		
	chrome.downloads.erase({id: downloadItem.id});
	chrome.downloads.setShelfEnabled(true);
	
	setTimeout(function() {
		state = 'idle';
	}, 1000);
}

function download() {
	state = 'download';
    console.log('download');
	chrome.downloads.setShelfEnabled(false);
	chrome.downloads.download({
		url: 'https://localhost:3001/download?filename=1.xlsm',
		method: 'GET',
	}, function(downloadId){	
		var interval = setInterval(function() {
			chrome.downloads.search({id: downloadId}, function(downloadItems) {
				if(downloadItems[0].state === 'complete') {
					clearInterval(interval);
					downloadItem = downloadItems[0];
					state = 'downloaded';
                    console.log('download finished');
				}
			});
		}, 100);
	});		
}

chrome.runtime.onMessage.addListener(function(message,sender) {
	if(sender.tab) {
		if(state === 'downloaded') {
			open();
		}
		if(state === 'idle') {
			download();
		}
	}
});