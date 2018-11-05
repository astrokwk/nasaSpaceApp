var apiKey = 'OFxgFiHTSBNXJIKYfAiYq0LrcjOZWrL53tBbpg3o';

var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    var myObj = JSON.parse(this.response);
    console.log(xhr.status);
    console.log(myObj);
  }  else {
    console.log('The Request Failed');
  }


}

xhr.open("GET", "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=" + apiKey);
xhr.send();
