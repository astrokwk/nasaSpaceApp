var apiKey = 'OFxgFiHTSBNXJIKYfAiYq0LrcjOZWrL53tBbpg3o';

var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if(xhr.status >= 200 && xhr.status < 300) {
    var myObj = JSON.parse(this.response);
    console.log(xhr.status);
    console.log(myObj);
  } else {
    console.log('The Request Faild');
  }
}

xhr.open('GET', 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-10-07&end_date=2017-10-14&api_key=' +apiKey);
xhr.send();