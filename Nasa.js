window.onscroll = function() {scrollFunction()};

var header = document.getElementById('header');

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.style.fontSize = "30px";
			header.style.padding = "20px 10px 50px";
    } else {
        header.style.fontSize = "90px";
			header.style.padding = "45vh 10px 40vh";
    }
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
			var arr = ['NASA', "Nasa's", 'Milky', 'Space', 'Mars'];
			// console.log(myObj.articles[i].title);
			function contains (target, pattern){
				var value = 0;
				pattern.forEach(function(word){
					value = value + target.includes(word)
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

				newsbox.setAttribute('class','newsbox');
				newsbox.setAttribute('id', 'newsboxid');
				// newbox.style.backgroundImage = "url(" + myObj.articles[i].urlToImage + ")";

				var newsTitle = document.createElement('h4');
				// newsbox.appendChild(newsTitle);

				newsimage.setAttribute('src', myObj.articles[i].urlToImage);

				newsTitle.innerHTML = myObj.articles[i].title;
				document.getElementById('NewsContainer').appendChild(newsbox);
				newsbox.appendChild(newsimage);
				newsbox.appendChild(newsTitle);
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

