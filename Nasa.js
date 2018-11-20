window.onload= function() {
	document.getElementById('loading').style.display = "none";
	document.getElementById('body').style.overflow = 'auto';
}

var header = document.getElementById('header');


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	// some code..
	header.style.fontSize = "30px";
	header.style.padding = "20px 10px 10px";
 } else {
	window.onscroll = function() {scrollFunction()};
 }

 function scrollFunction() {
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
			header.style.fontSize = "30px";
		header.style.padding = "20px 10px 40px";
	} else {
			header.style.fontSize = "90px";
		header.style.padding = "45vh 10px 40vh";
	}
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
		var myObj = JSON.parse(this.response);
			
		for (var i = 0; i < myObj.articles.length; i++) {
			var str = myObj.articles[i].title;
			var arr = ["NASA's", "Weird", "Space", "Mars", "Galaxies", "Hubble"];
		
			function contains (target, pattern){
				var value = 0;
				pattern.forEach(function(word){
					value = value + target.includes(word);
				});
				return (value === 1);

			}

			if(contains(str, arr)){
				var newsbox = document.createElement('div');
				var newsimage = document.createElement('img');
				var newslink = document.createElement('a');

				newsbox.setAttribute('class','newsbox');
				newsbox.setAttribute('id', 'newsboxid');
				newslink.setAttribute('class', 'newslink');
				newslink.setAttribute('href', myObj.articles[i].url);
				newslink.setAttribute('target', "_blank");
				newslink.innerHTML = "Read More>>";

				var newsTitle = document.createElement('h5');

				if (myObj.articles[i].urlToImage !== null) {
					newsimage.setAttribute('src', myObj.articles[i].urlToImage);
				} else {
					newsimage.setAttribute('src', 'NasaImages/astronaunt.jpg');
				}

				newsTitle.innerHTML = myObj.articles[i].title;
				document.getElementById('NewsContainer').appendChild(newsbox);
				newsbox.appendChild(newsimage);
				newsbox.appendChild(newsTitle);
				newsTitle.appendChild(newslink);

			}
		}

		var attributeLink = document.createElement('a');
		attributeLink.setAttribute('href', 'https://newsapi.org');
		attributeLink.setAttribute('target', '_blank');
		attributeLink.setAttribute('id', 'attributeLink');
		attributeLink.innerHTML = "Powered by News API";
		document.getElementById('NewsContainer').appendChild(attributeLink);
		
	} else {
		console.log('The Request failed');
	}
}

xhr.open('GET', 'https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=cb7e67ef7fa945839ab3f7291eacf3f4');
xhr.send();