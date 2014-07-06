/*
	Code school jQuery AJAX class
	07/05 XJ
*/

$(document).ready(function(){
    //show the hidden element when the button is clicked
    $(".confirmation").on("click","button",function(){

        //$.ajax(url[, setings])
        //relative URL
        $.ajax("confirmation.html",{

            //runs only when server returns a successful response
            success: function(response) {
                $(".ticket").html(response).slideDown();
            },

            data: {"confNum":$(".ticket").data("confNum")},

            //timeout, abort, or server error
            error: function(request, errorType, errorMessage) {
                console.log("Error:" + errorType + " with message: " + errorMessage);
            },

            //specify the timeout
            timeout: 3000,

            //runs before ajax request, for trigger loading string or spinner
            beforeSend: function(){
                $(".confirmation").addClass("is-loading");
            },

            //run after success and error
            complete: function(){
                $(".confirmation").removeClass("is-loading");
            }

        });

        //same as $.get(url, success)
        /*$.get("confirmation.html", function(response) {
         $(".ticket").html(response).slideDown();
         });*/

    });

    //show boarding pass when link is clicked
    //event delegation
    $(".confirmation").on("click", ".view-boarding-pass", function(){
        $(this).closest(".ticket").find("img").attr("src", "img/ticket.jpg");
    });
});



