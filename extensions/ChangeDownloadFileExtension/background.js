var disabled = false;

chrome.downloads.onCreated.addListener(function (downloadItem) {
	if(disabled) {
		return;
	}
	
	if(downloadItem.mime === 'text/plain') {

		disabled = true;
		chrome.downloads.cancel(downloadItem.id);
		chrome.downloads.erase({id: downloadItem.id});
		chrome.downloads.download({
			url: 'https://localhost:3001/download?filename=' + downloadItem.filename + '&mime=text/plain',
			method: 'GET',
		}, function(downloadId){
			chrome.downloads.search({id: downloadId}, function(downloadItem) {
				console.log(downloadItem);
			});
			disabled = true;
		});
	}
});