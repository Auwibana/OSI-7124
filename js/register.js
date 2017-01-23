document.getElementsById("reg").addEventListener("click", function() {
  document.getElementsById("dialog").show();
}, false);

document.getElementsById("dialog")[0].addEventListener("click", function() {
  this.close();
}, false);
