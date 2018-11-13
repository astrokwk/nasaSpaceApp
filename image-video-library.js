var submitLibrary = document.getElementById('submit-library');

submitLibrary.addEventListener('click', libraryRequest);
var searchValue = document.getElementById('searchValue');

function libraryRequest() {
  console.log('meow');
  var searchWord = searchValue.value;

  xhr.open('GET', 'https://images-api.nasa.gov/search?q=' + searchWord);
  xhr.send();
}

var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if(xhr.status >= 200 && xhr.status < 300) {
    var myObj = JSON.parse(this.response);
    console.log(myObj);
  }
}

