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
  console.log('Chicken');
}

function loading(){
  document.getElementById('loader').style.display = "block";
}

function stopLoading(){
  document.getElementById('loader').style.display = "none";
}

var submitLibrary = document.getElementById('submit-library');
var collectionContainer = document.getElementById('collection-container');
var searchValue = document.getElementById('searchValue');
var page = document.getElementById('page');
var pageNumber = document.getElementById('pageNumber');
//navigation button
var next = document.getElementById('next');
var previous = document.getElementById('previous');
//search button click
submitLibrary.addEventListener('click', libraryRequest);

searchValue.addEventListener('keyup', function(e){
  e.preventDefault();
  if(e.keyCode === 13){
    submitLibrary.click();
  }
});

function libraryRequest() {
  loading();
  var searchWord = searchValue.value;
  if(searchWord !== '') {
  var searchUrl = 'https://images-api.nasa.gov/search?q=' + searchWord;

  var checkedList = [];
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

  for (var v = 0; v < checkboxes.length; v++) {
  checkedList.push(checkboxes[v].value);
  var searchMedia = searchUrl + "&media_type=" + checkedList.toString();
  }

  xhr.open('GET', searchMedia);
  xhr.send();


  while(collectionContainer.firstChild){
    collectionContainer.removeChild(collectionContainer.firstChild);
  }
  } else {
    collectionContainer.innerHTML = "Enter Something";
    stopLoading();
    next.style.display = 'none';
  }
}

var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if(xhr.status >= 200 && xhr.status < 300) {
    stopLoading();
    var myObj = JSON.parse(this.response);
    var totalHits = myObj.collection.metadata.total_hits;
    var collectionItems = myObj.collection.items;
    var navigationLinks =myObj.collection.links;

    if (totalHits === 0) {
      collectionContainer.innerHTML = "Please enter something related to NASA";
      stopLoading();
      next.style.display = 'none';
    }

    if(collectionItems.length >= 100){next.style.display = "inline-block";}
    next.addEventListener('click', function(){
      loading();
      previous.style.display = "inline-block";
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

    if(navigationLinks === undefined) {
    } else if(navigationLinks[0].prompt === "Next") {
      previous.style.display = "none";
    } else if(navigationLinks[0].prompt === "Previous" && navigationLinks.length === 1) {
      next.style.display = "none";
    }

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
        var mediaAlt = itemsData[m].title;
        var mDescrip = itemsData[m].description;
        var mediaDate = itemsData[m].date_created;
           
        getItems[k] = new XMLHttpRequest();
              
        url = collectionItems[k].href;
        getItems[k].open("GET", url, true);
        getItems[k].onload = function(){
          if (getItems[k].status >= 200 && getItems[k].status < 300){
            var itemsFirst = JSON.parse(getItems[k].response); 
            var itemBox = document.createElement('div');
            itemBox.setAttribute('class', 'itemBox');
            var modal = document.createElement('div');
            modal.setAttribute('class', 'modal');
            var title = document.createElement('h3');
            var date = document.createElement('p');
            var description = document.createElement('p');

            title.innerHTML = mediaAlt;
            date.innerHTML = "<b>Year: </b>" + mediaDate.substring(0,4);

          if(mDescrip && mDescrip.length >= 200){
            description.innerHTML = mDescrip.replace(/^(.{200}[^\s]*).*/, "$1") + "...";
              } else {
                description.innerHTML = mDescrip;
                }

            modal.appendChild(title);
            modal.appendChild(date);
            modal.appendChild(description);
            itemBox.appendChild(modal);

            itemBox.addEventListener('mouseover', function(){
              modal.style.display = "block";
                });
            itemBox.addEventListener('mouseout', function() {
              modal.style.display = "none";
                });
                }
 
              if(mediaType === "video") {
                var itemsVideo = document.createElement('video');
                var videoSource = document.createElement('source');

                itemsVideo.setAttribute('controls', true);
                videoSource.setAttribute('src', itemsFirst[0]);
                videoSource.setAttribute('type', 'video/mp4');
                itemsVideo.appendChild(videoSource);

                itemBox.appendChild(itemsVideo);
                collectionContainer.appendChild(itemBox);
                  } else if (mediaType === 'audio') {
                      var itemsAudio = document.createElement('audio');
                      var audioSource = document.createElement('source');

                      itemsAudio.setAttribute('controls', true);
                      audioSource.setAttribute('src', itemsFirst[0]);
                      audioSource.setAttribute('type', 'audio/wav');
                        
                      itemsAudio.appendChild(audioSource);

                      itemBox.appendChild(itemsAudio);
                      collectionContainer.appendChild(itemBox);
                    } else if (mediaType === "image"){
                      var itemsImage = document.createElement('img');
                      itemsImage.setAttribute('src', './NasaImages/loader.gif');
                      itemsImage.setAttribute('alt', mediaAlt);
                      itemsImage.setAttribute('onerror', "this.style.display='none'");

                      var allimages = document.getElementsByTagName('img');
                        
                      for(var y = 0; y < allimages.length; y++){
                        var downloadingImage = [], y;
                        downloadingImage[y] = new Image();
                        downloadingImage[y].onload = function(src) {
                          allimages[y].src = this.src;}
                          downloadingImage[y].src = itemsFirst.slice(-2)[0];
                        }
                      itemBox.appendChild(itemsImage);
                      collectionContainer.appendChild(itemBox);
              }
            }; getItems[k].send();
          } 
    }
  } else {
    console.log('the Request failed');
  }
}

