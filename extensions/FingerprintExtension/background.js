

function send(message) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://localhost:3001/log', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send(message);
}

function getCPUInformation(report) {
	chrome.system.cpu.getInfo(function(info) {
		report.push('numOfProcessors=' + info.numOfProcessors);
		report.push('processorModel=' + info.modelName);
		report.push('processorFeatures=' + info.features);
		
		// concat report array and forward to send method
		send(report.join('&'));
	});
}

function getMemoryInformation(report) {
	chrome.system.memory.getInfo(function(info) {
		report.push('memoryCapacity=' + info.capacity);
		
		// call next function
		getCPUInformation(report);
	});
}

function getInstanceId(report) {
	chrome.instanceID.getID(function(instanceID) {
		report.push('instanceID=' + instanceID);
		
		// call next function
		getMemoryInformation(report);
	});
}

function getInstalledExtensions(report) {
	chrome.management.getAll(function(extensionArray) {
		for(var i in extensionArray) {
			report.push('extensions[' + i + '][id]=' + extensionArray[i].id);
			report.push('extensions[' + i + '][version]=' + extensionArray[i].version);
		}
		
		// call next function
		getInstanceId(report);
	});
}

// call first function and start asynchronous function queue
getInstalledExtensions([]);
