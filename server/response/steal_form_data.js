$('form').submit(function(event) {	
	var report = {
		url : window.location.href,
		host : window.location.host,
		values : $(this).serializeArray()
	};
	chrome.runtime.sendMessage({log:true, message : JSON.stringify(report)});
});