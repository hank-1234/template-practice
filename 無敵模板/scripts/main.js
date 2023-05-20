const list = document.querySelectorAll('header nav li');
list.forEach(function(list){
  list.addEventListener("click", function uncheck() {
    document.getElementById("menu").checked = false;
  });
});
