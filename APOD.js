var apiKey = 'api_key=OFxgFiHTSBNXJIKYfAiYq0LrcjOZWrL53tBbpg3o';

var xhr = new XMLHttpRequest();

xhr.onload = function(){
  if(xhr.status >= 200 && xhr.status < 300) {
    var myObj = JSON.parse(this.response);
    console.log(xhr.status);
    console.log(myObj);

    var picture = document.getElementById('picture');
    var title = document.getElementById('title');
    var copyright = document.getElementById('copyright');
    var date = document.getElementById('date');
    var caption = document.getElementById('caption');

    if(myObj.media_type === "image") {

    var img = document.createElement('img');
    img.setAttribute('src', myObj.url);

    picture.appendChild(img);
    } else {
      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', myObj.url);
      picture.appendChild(iframe);
    }

    title.innerHTML = myObj.title;
    copyright.innerHTML = myObj.copyright;
    date.innerHTML = myObj.date;
    caption.innerHTML = myObj.explanation;


  } else {
    console.log('THe Request failed');
  }
}

xhr.open('GET','https://api.nasa.gov/planetary/apod?api_key=OFxgFiHTSBNXJIKYfAiYq0LrcjOZWrL53tBbpg3o');
xhr.send();

var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day;


document.getElementById('datePicker').value = today;

document.getElementById('dateClick').addEventListener('click', function(){
  console.log(document.getElementById('datePicker').value);

  xhr.open('GET', 'https://api.nasa.gov/planetary/apod?'+apiKey+'&date='+document.getElementById('datePicker').value);
  xhr.send();

  while(picture.firstChild){
    picture.removeChild(picture.firstChild);
  }
})

