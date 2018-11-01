// window.onscroll = function() {scrollFunction()};
// $(window).load(function() {
// 	$('#loading').hide();
// });

window.onload= function() {
	document.getElementById('loading').style.display = "none";
}

var header = document.getElementById('header');

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.style.fontSize = "30px";
			header.style.padding = "20px 10px 40px";
    } else {
        header.style.fontSize = "90px";
			header.style.padding = "45vh 10px 40vh";
    }
}


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	// some code..
	console.log('mom');
	header.style.fontSize = "30px";
	header.style.padding = "20px 10px 10px";
 } else {
	window.onscroll = function() {scrollFunction()};
 }

 function openNav() {
	 document.getElementById('sidenav').style.width = "250px";
 }

 function closeNav() {
	 document.getElementById('sidenav').style.width = "0";
 }



var xhr = new XMLHttpRequest();

xhr.onload = function() {
	if(xhr.status >= 200 && xhr.status <300) {
		console.log('success', xhr);
		var myObj = JSON.parse(this.response);
		console.log(myObj);


		// for (var key in myObj.articles) {
		// 	console.log(myObj.articles[key].description);
		// 	var pup = myObj.articles[key].title;
		// // console.log(myObj.articles[i].description);
		// if(pup.indexOf('NASA')) {
		// 	console.log('monkey');
		// }
		
		
		for (var i = 0; i < myObj.articles.length; i++) {
			var str = myObj.articles[i].title;
			var arr = ["NASA's", "Weird", "Space", "Mars", "Galaxies", "Hubble"];
			// console.log(myObj.articles[i].title);
			function contains (target, pattern){
				var value = 0;
				pattern.forEach(function(word){
					value = value + target.includes(word);
				});
				return (value === 1);

			}

			if(contains(str, arr)){
				console.log('monkey');
			} else {
				console.log('cat');
			}
			// console.log(contains(str, arr))
			if(contains(str, arr)){

				console.log(myObj.articles[i].title);
				var newsbox = document.createElement('div');
				var newsimage = document.createElement('img');
				var newslink = document.createElement('a');

				newsbox.setAttribute('class','newsbox');
				newsbox.setAttribute('id', 'newsboxid');

				newslink.setAttribute('class', 'newslink');
				newslink.setAttribute('href', myObj.articles[i].url);
				newslink.setAttribute('target', "_blank");
				newslink.innerHTML = "Read More>>";
				// newsbox.style.backgroundImage = "url(" + myObj.articles[i].urlToImage + ")";

				var newsTitle = document.createElement('h5');
				// newsbox.appendChild(newsTitle);

				newsimage.setAttribute('src', myObj.articles[i].urlToImage);

				newsTitle.innerHTML = myObj.articles[i].title;
				document.getElementById('NewsContainer').appendChild(newsbox);
				newsbox.appendChild(newsimage);
				// newsbox.appendChild(newslink);
				newsbox.appendChild(newsTitle);
				// newsbox.appendChild(newslink);
				newsTitle.appendChild(newslink);
				// console.log(myObj.articles[i].description);
			// }
			// document.getElementById('newbie').innerHTML = myObj.articles[3].author;
			// console.log(myObj.articles[i].author);
			// console.log(myObj.articles[i].description);
			}
		}
		
//		document.getElementById('newbie').innerHTML = myObj.articles;
		
	} else {
		console.log('The Request failed');
	}
}

xhr.open('GET', 'https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=cb7e67ef7fa945839ab3f7291eacf3f4');
xhr.send();
// document.getElementById('btn').addEventListener('click', function() {
	// xhr.send();
// });

