$('input[type="submit"]').click(function(e) {
  var username = $('input[type="text"]').value();
  var password = $('input[type="password"]').value();
  alert(username + password);
});