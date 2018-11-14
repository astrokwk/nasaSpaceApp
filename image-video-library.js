var submitLibrary = document.getElementById('submit-library');
var collectionContainer = document.getElementById('collection-container');

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
    var collectionItems = myObj.collection.items;




    // var f = (function(){
      var getItems = [], k;
      for(var k = 0; k < collectionItems.length; k++){ //for loop
        var moo = collectionItems[k].data;
        // for (var m = 0; m < moo.length; m++) {
        //   if(moo[m].media_type === "video") {
        //     console.log('monkey');
          // }}
          // (

            for (var m = 0; m < moo.length; m++) {
              // if(moo[m].media_type === "video") {
              //   console.log('monkey');
              //   console.log(collectionItems[k]);
              //   foo(k);
              // } else if (moo[m].media_type === "image"){
              //   console.log('hedgehog');
              //   console.log(collectionItems[k]);
              //   foo(k);
              // } else {
              //   console.log('chicken');
              //   foo(k);
              // }
              foo(k);
            }

            function foo(k){
              // console.log(moo[m].media_type + ' 2slkfjlskdf');
              var chicken = moo[m].media_type;
            // for (var m = 0; m < moo.length; m++) {
            //   if(moo[m].media_type === "video") {
            //     console.log('monkey');
            //     console.log(collectionItems[k]);
            getItems[k] = new XMLHttpRequest();
              url = collectionItems[k].href;
              getItems[k].open("GET", url, true);
              getItems[k].onload = function(){
                  if (getItems[k].status >= 200 && getItems[k].status < 300){
                      var itemsFirst = JSON.parse(getItems[k].response); 
                      // var mee = getItems[k].response;
                      // console.log(chicken + ' 2slkfjlskdf');
                    console.log(itemsFirst + 'lfkslkflssf');

                      console.log(itemsFirst[0]);
                      // return itemsFirst[0];
                      if(chicken === "video") {
                        var itemsVideo = document.createElement('video');
                        var videoSource = document.createElement('source');
                        itemsVideo.setAttribute('controls', true);
                        videoSource.setAttribute('src', itemsFirst[0]);
                        videoSource.setAttribute('type', 'video/mp4');
                        // itemsVideo.setAttribute('src', itemsFirst[0]);
                        itemsVideo.appendChild(videoSource);
                        collectionContainer.appendChild(itemsVideo);
                      } else if (chicken === 'audio') {
                        var itemsAudio = document.createElement('audio');
                        var audioSource = document.createElement('source');
                        itemsAudio.setAttribute('controls', true);
                        audioSource.setAttribute('src', itemsFirst[0]);
                        audioSource.setAttribute('type', 'audio/wav');
                        console.log('hedgehog');
                        console.log(collectionItems[k]);

                        itemsAudio.appendChild(audioSource);
                        collectionContainer.appendChild(itemsAudio);
                    }else if (chicken === "image"){
                        var itemsImage = document.createElement('img');
                        itemsImage.setAttribute('src', itemsFirst[0]);

                        collectionContainer.appendChild(itemsImage);
                      }


                  }
              };
              getItems[k].send();
            // }}
          } 
          // foo(k);
          // )(k);
        
      }
    // })();
    
  } else {
    console.log('the Request failed');
  }
}


// for(var k = 0; k < collectionItems.length; k++){ //for loop

//   var moo = collectionItems[k].data;
//   var url = collectionItems[k].href;

//   for (var m = 0; m < moo.length; m++) {
//     if(moo[m].media_type === "video") {
//       // console.log(f);
//       console.log(collectionItems[k]);
//       var itemsVideo = document.createElement('iframe');
//       itemsVideo.setAttribute('src', collectionItems[k].href);
      
//       collectionContainer.appendChild(itemsVideo);
    
//     }}

//     // var url = collectionItems[k].href;

//   }}}