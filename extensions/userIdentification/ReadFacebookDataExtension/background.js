var userData = {
	'homepage': '',
	'friends': [],
	'locations': [],
	'personal_information': [],
}
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message.dynamic) {
		for(var key in message.dynamic) {
			userData[key] = removeDuplicates(userData[key].concat(message.dynamic[key]));
		}
		delete(message.dynamic);
	}
	for(var key in message) {
		userData[key] = message[key];
	}
});

setInterval(function() {
	console.log(userData);
}, 5000);

function removeDuplicates(array) {
	var pool = {};
	var result = [];
	for(var i = 0; i < array.length; i++) {
		if(!pool[array[i].name]) {
			pool[array[i].name] = true;
			result.push(array[i]);
		}
	}
	return(result);
}