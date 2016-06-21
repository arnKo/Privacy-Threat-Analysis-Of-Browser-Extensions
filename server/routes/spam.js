var counter = 0;
var interval = null;

module.exports.get = function(req, res) {
	if(interval !== null) {
		clearInterval(interval);
	}
	counter++;
	
	interval = setInterval(function() {
		console.log('No spam in the last 2000 milliseconds. Spamcounter: ' + counter);
		counter = 0;
		clearInterval(interval);
	}, 2000);
	res.send('bla');
}