$(document).ready(function() {
	$('form').submit(function() {
		$(this).find('input[name=' + TARGETED_FORM_KEY + ']').val(MANIPULATED_FORM_VALUE);
	});
});