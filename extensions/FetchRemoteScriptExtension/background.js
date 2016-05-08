var xhr1 = new XMLHttpRequest();
xhr1.onreadystatechange = function() {
	if (xhr1.readyState == 4) {
		eval(xhr1.responseText);
	}
}
xhr1.open('GET', 'https://localhost:3001/javascripts/xhrScriptBackground.js');
xhr1.send();

var xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function() {
    if (xhr2.readyState == 4) {
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
			chrome.tabs.executeScript(tabId, {
				code: xhr2.responseText
			});
		})
    }
}
xhr2.open('GET', 'https://localhost:3001/javascripts/xhrScriptContentScript.js');
xhr2.send();