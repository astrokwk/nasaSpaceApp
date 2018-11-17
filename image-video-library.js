var submitLibrary = document.getElementById('submit-library');
var collectionContainer = document.getElementById('collection-container');
var searchValue = document.getElementById('searchValue');
//navigation button
var next = document.getElementById('next');
var previous = document.getElementById('previous');
//search button click
submitLibrary.addEventListener('click', libraryRequest);

function libraryRequest() {
  var searchWord = searchValue.value;
  var searchUrl = 'https://images-api.nasa.gov/search?q=' + searchWord;

  var checkedList = [];
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

  for (var v = 0; v < checkboxes.length; v++) {
  checkedList.push(checkboxes[v].value);
  var searchMedia = searchUrl + "&media_type=" + checkedList.toString();
  }

  xhr.open('GET', searchMedia);
  xhr.send();

  searchValue.value = '';

  while(collectionContainer.firstChild){
    collectionContainer.removeChild(collectionContainer.firstChild);
  }
}

var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if(xhr.status >= 200 && xhr.status < 300) {
    var myObj = JSON.parse(this.response);
    // console.log(myObj);
    var collectionItems = myObj.collection.items;
    var navigationLinks =myObj.collection.links;

    next.addEventListener('click', function(){
      while(collectionContainer.firstChild){
        collectionContainer.removeChild(collectionContainer.firstChild);
      }
      for(var p in navigationLinks) {
        if(navigationLinks[p].prompt ==="Next") {
        xhr.open('GET', navigationLinks[p].href);
        xhr.send();
        }
      }
    });

    previous.addEventListener('click', function() {
      while(collectionContainer.firstChild) {
        collectionContainer.removeChild(collectionContainer.firstChild);
      }
      for(p in navigationLinks) {
        if(navigationLinks[p].prompt ==="Previous") {
          xhr.open('GET', navigationLinks[p].href);
          xhr.send();
        }
      }
    });


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
 
              if(mediaType === "video") {
                var itemsVideo = document.createElement('video');
                var videoSource = document.createElement('source');

                itemsVideo.setAttribute('controls', true);
                videoSource.setAttribute('src', itemsFirst[0]);
                videoSource.setAttribute('type', 'video/mp4');
                itemsVideo.appendChild(videoSource);

                collectionContainer.appendChild(itemsVideo);
                  } else if (mediaType === 'audio') {
                      var itemsAudio = document.createElement('audio');
                      var audioSource = document.createElement('source');

                      itemsAudio.setAttribute('controls', true);
                      audioSource.setAttribute('src', itemsFirst[0]);
                      audioSource.setAttribute('type', 'audio/wav');
                        
                      itemsAudio.appendChild(audioSource);

                      collectionContainer.appendChild(itemsAudio);
                    } else if (mediaType === "image"){
                        var itemsImage = document.createElement('img');
                        itemsImage.setAttribute('src', './NasaImages/loader.gif');
                        itemsImage.setAttribute('onerror', "this.style.display='none'");

                        var allimages = document.getElementsByTagName('img');
                        var downloadingImage = [], y;
                        
                        for(var y = 0; y < allimages.length; y++){
                          downloadingImage[y] = new Image();
                          downloadingImage[y].onload = function() {
                          allimages[y].src = this.src;}
                        downloadingImage[y].src = itemsFirst.slice(-2)[0];
                        }
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

