/*
	Code school jQuery AJAX class
	07/05 XJ
*/


//js object
var confirmation = {
    init: function(){
        //event handlers
        $(".confirmation").on("click","button", this.loadConfirmation);
        $(".confirmation").on("click", ".view-boarding-pass", this.showBoardingPass());
    },

    //wrap method in event handlers
    loadConfirmation: function(){
        $.ajax("confirmation.html",{
            success: function(response) {
                $(".ticket").html(response).slideDown();
            },
            data: {"confNum":$(".ticket").data("confNum")},
            error: function(request, errorType, errorMessage) {
                console.log("Error:" + errorType + " with message: " + errorMessage);
            },
            timeout: 3000,
            beforeSend: function(){
                $(".confirmation").addClass("is-loading");
            },
            complete: function(){
                $(".confirmation").removeClass("is-loading");
            }
        });
    },
    showBoardingPass: function(){
        $(this).closest(".ticket").find("img").attr("src", "img/ticket.jpg");
    }
};

$(document).ready(function(){
    confirmation.init();
});