/*
	Code school jQuery AJAX class
	07/05 XJ
*/

$(document).ready(function(){
	
});

//show the hidden element when the button is clicked
$(".confirmation").on("click","button",function(){

	//$.ajax(url[, setings])
		//relative URL
	$.ajax("confirmation.html",{
		//runs only when server returns a successful response
		success: function(response) {
			$(".ticket").html(response).slideDown();
		},
		data: {"confNum":$(".ticket").data("confNum")}

	});

	//same as $.get(url, success)	
	/*$.get("confirmation.html", function(response) {
		$(".ticket").html(response).slideDown();
	});*/
	
});


//show boarding pass when link is clicked
$(".confirmation .view-boarding-pass").on("click",function(){
	$(this).closest(".ticket").find("img").show();
});
