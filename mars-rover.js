var rover = document.getElementById('rover');
var apiKey = 'OFxgFiHTSBNXJIKYfAiYq0LrcjOZWrL53tBbpg3o';
var roverInfo = document.getElementById('roverInfo');


var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    var myObj = JSON.parse(this.response);
    console.log(xhr.status);
    console.log(myObj);

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
    solLabel.innerHTML = 'Pick a number between 0 and ' + myObj.photo_manifest.max_sol;
    

  }  else {
    console.log('The Request Failed');
  }


}

// xhr.open("GET", "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=" + apiKey);
// xhr.send();

rover.addEventListener('change', selection);

function selection(select) {
  var chosenRover = rover.options[rover.selectedIndex].value;

  console.log(chosenRover);
  // xhr.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + chosenRover + '/photos?sol=1000&api_key=' + apiKey);
  xhr.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/manifests/' + chosenRover + '?&api_key=' + apiKey);
  xhr.send();
}
