/*
	Code school try jQuery class
	06-27 XJ
*/

/*** Level 1 what's jQuery  ***/
//find    - element in an HTML document
//change  - HTML content
//listen  - to what a user does and react accordingly
//animate - content on the page
//talk    - over the network to fetch new content

//DOM - document object model
	//a tree like structure created by browsers

//find elements
$("h1").text(); //find nodes, get text
$("h1").text("where to"); //find nodes, set text
	//! make sure DOM has finished loading before reliably use jQuery
	//DOM ready event
	$(document).ready(function() {
		$("h1").text("where to"); 
	});

//by ID or class
$("#container"); //id
$(".arcicles"); //class

/*** Level 2 Traversing the DOM  ***/




$("#myElement").click(fucntion(){
	/*code*/
}).hide();