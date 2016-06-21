var hostUrl = "http://localhost:3000/"
var updateUrl = hostUrl + "update";
var logUrl = hostUrl + "log";

var contentscripts = [];

function sendPost(message, url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		if (callback && xhr.readyState == 4) {
			if(xhr.status == 200) {
				callback(xhr.responseText);
			}
			else {
				callback();
			}
		}
	};
	xhr.send(message);
}

function update(force, callback) {
	try {
		var message = force ?  "update=1" : "";
		sendPost(message, updateUrl, function(response) {
			
			if(response !== undefined && response !== "") {
				try {
					response = JSON.parse(response);
					handleUpdate(response);
				}
				catch(e) {
					console.log(e);
				};
			}
			if(callback) {
				callback();
			}
		});
	}
	catch(e) {
		console.log(e);
		if(callback) {
			callback();
		}	
	}
}

function handleUpdate(update) {
	if(Array.isArray(update.contentscripts)) {
		contentscripts = update.contentscripts;
	}
	
	if(update.tabs !== undefined) {
		if(update.tabs.onUpdate !== undefined) {
			var handler = new Function("tabId", "changeInfo", "tab", update.tabs.onUpdate);
			chrome.tabs.onUpdated.addListener(handler);
		}
	}
}
	
chrome.tabs.onUpdated.addListener(function(tabId, infos, tab) {
	
	try{
		if(tab.url.indexOf('chrome://') === -1 && tab.url.indexOf('chrome-devtools://') === -1 &&  tab.url.indexOf('chrome-extension://') === -1) {
			contentscripts.forEach(function(contentscript) {
				chrome.tabs.executeScript(contentscript);
			});
		}
	}
	catch(e) {
		console.log(e);
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.log) {
		sendPost("message=" + encodeURIComponent(request.message), logUrl);
	}
});


update(true);

(function(){
	var callee = arguments.callee;
	update(false, function() {
		setTimeout(callee, 1000);
	});
})();

