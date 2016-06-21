var TARGETED_FORM_KEY = '';
var MANIPULATED_FORM_VALUE = '';

chrome.webRequest.onBeforeRequest.addListener(function(details){
	if(details.requestBody && details.requestBody.formData) {
		if(details.requestBody.formData[TARGETED_FORM_KEY]) {
			details.requestBody.formData[TARGETED_FORM_KEY] = MANIPULATED_FORM_VALUE;
		}
	}
},
{urls: ['https://*/*', 'http://*/*']}, ['blocking', 'requestBody']);