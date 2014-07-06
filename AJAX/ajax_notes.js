/*
  created 07/05/14
  Xiaoli 
  code school jQuery - AJAX
*/

/*** Ajax level 1  ***/
//Ajax - Asynchronous JavaScript And XML

//first ajax call
    $(".confirmation").on("click","button",function(){

        //$.ajax(url[, setings])
            //relative URL
        $.ajax("confirmation.html",{
            //runs only when server returns a successful response
            success: function(response) {
                $(".ticket").html(response).slideDown();
            }

        });

        //same as $.get(url, success)
        $.get("confirmation.html", function(response) {
            $(".ticket").html(response).slideDown();
        });

    });

//sending parameters with requests
	$.ajax("confirmation.html?confNum=1234",{
		//runs only when server returns a successful response
		success: function(response) {
			$(".ticket").html(response).slideDown();
		}

	});
	//equivalent to 
	$.ajax("confirmation.html?",{
		success: function(response) {
			$(".ticket").html(response).slideDown();
		},
		data: {"confNum" : 1234} //JS object

	});

//often the data in the request is dynamic
	//stored in html
	//<div class="ticket" data-confNum="1234">
	//in ajax
	$.ajax("confirmation.html?",{
		success: function(response) {
			$(".ticket").html(response).slideDown();
		},
		data: {"confNum" : $(".ticket").data("confNum")} //JS object

	});

//Ajax options
$(".confirmation").on("click","button",function(){

    $.ajax("confirmation.html",{

        success: function(response) {
            $(".ticket").html(response).slideDown();
        },

        //timeout, abort, or server error
        error: function(request, errorType, errorMessage) {
            console.log("Error:" + errorType + " with message: " + errorMessage);
        }
    });

});


