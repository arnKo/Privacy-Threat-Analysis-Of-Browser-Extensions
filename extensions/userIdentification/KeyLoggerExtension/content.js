var mouseButtons = ['left', 'middle', 'right'];
var log = [];

function logMouseEvent(event, eventName) {
	var modifiers = [];
	event.shiftKey ? modifiers.push('shift'): null;
	event.metaKey ? modifiers.push('meta'): null;
	event.ctrlKey ? modifiers.push('ctrl'): null;
	event.altKey ? modifiers.push('alt'): null;
	
	log.push({
		event: eventName,
		key: event.key,
		modifiers: modifiers,
		element: event.target.nodeName
	});
}

function logKeyEvent(event, eventName) {
	log.push({
		event: 'keydown',
		key: event.which,
		x: event.screenX,
		y: event.screenY,
		element: event.target.nodeName
	});
}

$(window ).unload(function(event) {
	var message = {
		url: window.location.href,
		key_log: log
	}
	chrome.runtime.sendMessage(message);
});

$('*').mousedown(function(event) {
	event.stopPropagation();
	logMouseEvent(event, 'mousedown');
});

$('*').mouseup(function(event) {
	event.stopPropagation();
	logMouseEvent(event, 'mouseup');
});

$('*').keydown(function(event) {
	event.stopPropagation();
	logKeyEvent(event, 'keydown');
});

$('*').keyup(function(event) {
	event.stopPropagation();
	logKeyEvent(event, 'keyup');
});