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
    console.log(collectionItems);
    var navigationLinks =myObj.collection.links;
    console.log(navigationLinks);

    page.style.display = 'block';
    var count = 1;
    pageNumber.innerHTML = count;
    

    if(collectionItems.length >= 100){next.style.display = "block";}
    next.addEventListener('click', function(){
      // page.innerHTML = "Page " + 1+=1;
      previous.style.display = "block";
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
      console.log('monkey');
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
           
          getItems[k] = new XMLHttpRequest();
              
          url = collectionItems[k].href;
          getItems[k].open("GET", url, true);
          getItems[k].onload = function(){
            if (getItems[k].status >= 200 && getItems[k].status < 300){
              var itemsFirst = JSON.parse(getItems[k].response); 
              var imageBox = document.createElement('div');
              imageBox.setAttribute('class', 'imageBox');
              var imageD = document.createElement('div');
                      imageD.setAttribute('class', 'imageD');
                      var title = document.createElement('h3');
                      var pcheese = document.createElement('p');

                      title.innerHTML = mediaAlt;

                      if(mDescrip && mDescrip.length >= 300){
                        pcheese.innerHTML = mDescrip.replace(/^(.{300}[^\s]*).*/, "$1") + "...";
                      } else {
                        pcheese.innerHTML = mDescrip;
                      }

                      imageD.appendChild(title);
                      imageD.appendChild(pcheese);
                      imageBox.appendChild(imageD);

                      imageBox.addEventListener('mouseover', function(){
                        imageD.style.display = "block";
                        console.log('mouse over');
                      })
                      imageBox.addEventListener('mouseout', function() {
                        imageD.style.display = "none";
                        console.log('mouse out');
                      })
                    }
 
              if(mediaType === "video") {
                var itemsVideo = document.createElement('video');
                var videoSource = document.createElement('source');

                itemsVideo.setAttribute('controls', true);
                videoSource.setAttribute('src', itemsFirst[0]);
                videoSource.setAttribute('type', 'video/mp4');
                itemsVideo.appendChild(videoSource);

                imageBox.appendChild(itemsVideo);
                collectionContainer.appendChild(imageBox);
                  } else if (mediaType === 'audio') {
                      var itemsAudio = document.createElement('audio');
                      var audioSource = document.createElement('source');

                      itemsAudio.setAttribute('controls', true);
                      audioSource.setAttribute('src', itemsFirst[0]);
                      audioSource.setAttribute('type', 'audio/wav');
                        
                      itemsAudio.appendChild(audioSource);

                      // collectionContainer.appendChild(itemsAudio);

                      imageBox.appendChild(itemsAudio);
                      collectionContainer.appendChild(imageBox);
                    } else if (mediaType === "image"){
                      // var imageBox = document.createElement('div');
                      // imageBox.setAttribute('class', 'imageBox');
                      var itemsImage = document.createElement('img');
                      itemsImage.setAttribute('src', './NasaImages/loader.gif');
                      itemsImage.setAttribute('alt', mediaAlt);
                      itemsImage.setAttribute('onerror', "this.style.display='none'");

                      var allimages = document.getElementsByTagName('img');
                        // var downloadingImage = [], y;
                        
                      for(var y = 0; y < allimages.length; y++){
                        var downloadingImage = [], y;
                        downloadingImage[y] = new Image();
                        downloadingImage[y].onload = function(src) {
                          allimages[y].src = this.src;
                        console.log(this.src)}
                          downloadingImage[y].src = itemsFirst.slice(-2)[0];
                        }
                      imageBox.appendChild(itemsImage);
                      collectionContainer.appendChild(imageBox);

                      // var imageD = document.createElement('div');
                      // imageD.setAttribute('class', 'imageD');
                      // var pcheese = document.createElement('p');
                      // if(mDescrip && mDescrip.length >= 300){
                      //   pcheese.innerHTML = mDescrip.replace(/^(.{300}[^\s]*).*/, "$1") + "...";
                      // } else {
                      //   pcheese.innerHTML = mDescrip;
                      // }
                      console.log(mDescrip);
                      // pcheese.innerHTML = cheesy;
                      // imageD.appendChild(pcheese);
                      //   imageBox.appendChild(imageD);

                      //   imageBox.addEventListener('mouseover', function(){
                      //     imageD.style.display = "block";
                      //     console.log('mouse over');
                      //   })
                      //   imageBox.addEventListener('mouseout', function() {
                      //     imageD.style.display = "none";
                      //     console.log('mouse out');
                      //   })
                      // }
              }
            }; getItems[k].send();
          } 
    }
  } else {
    console.log('the Request failed');
  }
}

