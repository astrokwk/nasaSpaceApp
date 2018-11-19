var header = document.getElementById('header');

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	// some code..
	header.style.fontSize = "30px";
	header.style.padding = "20px 10px 10px";
 }

 function openNav() {
  document.getElementById('sidenav').style.width = "250px";
}

function closeNav() {
  document.getElementById('sidenav').style.width = "0";
}

var apiKey = '?&api_key=OFxgFiHTSBNXJIKYfAiYq0LrcjOZWrL53tBbpg3o';
//table Rover Info
var rover = document.getElementById('rover');
var roverInfo = document.getElementById('roverInfo');
//Input Rover for Sol
var solValue = document.getElementById('solValue');
var submitSol = document.getElementById('submitSol');

function loading(){
  document.getElementById('loader').style.display = "block";
}

function stopLoading(){
  document.getElementById('loader').style.display = "none";
}


var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    var myObj = JSON.parse(this.response);

    var k = '<tbody>';

    k += '<tr>';
    k += '<td> Rover: ' + myObj.photo_manifest.name + '</td>';
    k += '<td> Status: ' + '<span id="status">' + myObj.photo_manifest.status.toUpperCase(); + '</span>' + '</td>';
    k += '<td> Total Photos: ' + myObj.photo_manifest.total_photos + '</td>';
    k += '</tr> <tr>';
    k += '<td> Launch Date: ' + myObj.photo_manifest.launch_date + '</td>';
    k += '<td> Landing Date: ' + myObj.photo_manifest.landing_date + '</td>';
    k += '<td> Max Sol: ' + myObj.photo_manifest.max_sol + '</td>';
    k += '</tr> '
    k+= '</tbody>';
    roverInfo.innerHTML = k;

    if(myObj.photo_manifest.status === "active") {
      document.getElementById('status').style.color = "#52D017";
    } else {
      document.getElementById('status').style.color = "#3090C7";
    }

    var sol = document.getElementById('sol');
    var solLabel = document.getElementById('solLabel');

    sol.style.display = "block";
    solLabel.innerHTML = 'Pick a number between 1 and ' + myObj.photo_manifest.max_sol;

  }  else {
    console.log('The Request Failed');
  }
}

rover.addEventListener('change', selection);

function selection(select) {
  var chosenRover = rover.options[rover.selectedIndex].value;
  
  xhr.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/manifests/' + chosenRover + apiKey);
  xhr.send();
  solImages.innerHTML = '';
  return chosenRover;
}

submitSol.addEventListener('click', solNumber);
var solImages = document.getElementById('solImages');

function solNumber() {
  loading();
  var chosenSol = solValue.value;

  solValue.value= '';

  solRequest.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + selection() + '/photos?sol=' + chosenSol + apiKey);
  solRequest.send();
  
  while(solImages.firstChild){
    solImages.removeChild(solImages.firstChild);
  }
}

solValue.addEventListener('keyup', function(e){
  e.preventDefault();
  if(e.keyCode === 13){
    submitSol.click();
  }
});

var solRequest = new XMLHttpRequest();

solRequest.onload = function(data){
  if(solRequest.status >= 200 && solRequest.status < 300 && solRequest.readyState == 4){
    stopLoading();
    var solObj = JSON.parse(solRequest.response);

    for(var j = 0; j < solObj.photos.length; j++){
      var solImg = document.createElement('img');

      solImg.setAttribute('src', solObj.photos[j].img_src);
      document.getElementById('solImages').appendChild(solImg);
    }
  }
}
