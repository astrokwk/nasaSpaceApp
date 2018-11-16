var submitLibrary = document.getElementById('submit-library');
var collectionContainer = document.getElementById('collection-container');

submitLibrary.addEventListener('click', libraryRequest);
var searchValue = document.getElementById('searchValue');

function libraryRequest() {
  console.log('meow');
  var searchWord = searchValue.value;

  var searchUrl = 'https://images-api.nasa.gov/search?q=' + searchWord;

  var checkedList = [];
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

  for (var v = 0; v < checkboxes.length; v++) {
  checkedList.push(checkboxes[v].value);
  var searchMedia = searchUrl + "&media_type=" + checkedList.toString();
  }

  console.log(searchMedia);
    xhr.open('GET', searchMedia);
    xhr.send();

  searchValue.value = '';
  // xhr.open('GET', 'https://images-api.nasa.gov/search?q=' + searchWord);
  // xhr.send();
  while(collectionContainer.firstChild){
    collectionContainer.removeChild(collectionContainer.firstChild);
  }
}

var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if(xhr.status >= 200 && xhr.status < 300) {
    var myObj = JSON.parse(this.response);
    console.log(myObj);
    var collectionItems = myObj.collection.items;


    var getItems = [], k;
    for(var k = 0; k < collectionItems.length; k++){ 
        var itemsData = collectionItems[k].data;

        for (var m = 0; m < itemsData.length; m++) { loadItems(k) }

          function loadItems(k){
             
            var mediaType = itemsData[m].media_type;
           
            getItems[k] = new XMLHttpRequest();
              
            url = collectionItems[k].href;
            getItems[k].open("GET", url, true);
            getItems[k].onload = function(){
              if (getItems[k].status >= 200 && getItems[k].status < 300){
                  var itemsFirst = JSON.parse(getItems[k].response); 
 
                  console.log(itemsFirst + 'lfkslkflssf');
                  console.log(itemsFirst[0]);
                   
                if(mediaType === "video") {
                    var itemsVideo = document.createElement('video');
                    var videoSource = document.createElement('source');

                    itemsVideo.setAttribute('controls', true);
                    videoSource.setAttribute('src', itemsFirst[0]);
                    videoSource.setAttribute('type', 'video/mp4');
                    // itemsVideo.setAttribute('src', itemsFirst[0]);
                    itemsVideo.appendChild(videoSource);

                    collectionContainer.appendChild(itemsVideo);
                    } else if (mediaType === 'audio') {
                        var itemsAudio = document.createElement('audio');
                        var audioSource = document.createElement('source');

                        itemsAudio.setAttribute('controls', true);
                        audioSource.setAttribute('src', itemsFirst[0]);
                        audioSource.setAttribute('type', 'audio/wav');
                        console.log('hedgehog');
                        console.log(collectionItems[k]);
                        itemsAudio.appendChild(audioSource);

                        collectionContainer.appendChild(itemsAudio);
                    } else if (mediaType === "image"){
                        var itemsImage = document.createElement('img');
                        itemsImage.setAttribute('src', itemsFirst[0]);
                        itemsImage.setAttribute('onerror', "this.style.display='none'");

                        collectionContainer.appendChild(itemsImage);
                      }
              }
            }; getItems[k].send();
          } 
    }
  } else {
    console.log('the Request failed');
  }
}
