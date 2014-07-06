/*
	Code school jQuery AJAX class
	07/05 XJ
*/

$(document).ready(function(){
	
});

//show the hidden element when the button is clicked
$(".confirmation").on("click","button",function(){
	$(this).find(".ticket").slideDown();
});

//show boarding pass when link is clicked
$(".confirmation .view-boarding-pass").on("click",function(){
	$(this).closest(".ticket").find("img").show();
});
