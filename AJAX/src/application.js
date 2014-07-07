/*
	Code school jQuery AJAX class
	07/05 XJ
*/

function Vacation(destination){
    this.details = function(){
        console.log(destination);
    }
}

//js object
/*var confirmation = {
    init: function(){
        //event handlers
        $(".confirmation").on("click","button", this.loadConfirmation);
        $(".confirmation").on("click",".view-boarding-pass", this.showBoardingPass);
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
};*/

//js function
function Confirmation(el){
    this.el = el;

    //set for each ticket
    this.ticket = this.el.find(".ticket");

    //keep the same this
    var confirmation = this;

    //helper methods
    this.loadConfirmation = function(){
        $.ajax("confirmation.html",{
            //allow us to set "this" inside callback
            context:confirmation,
            success: function(response) {
                //in ajax, this is not the same
                this.ticket.html(response).slideDown();
                console.log("in loadconf, this" + this);
                console.log("in loadconf, this" + this.ticket);
            }
        });
    }
    this.showBoardingPass = function(event){
        event.preventDefault();
        /*$(".view-boarding-pass").hide();
        $(".boarding-pass").show();
        console.log("this:" + this);
        console.log(confirmation);*/
        $(this).hide();
        confirmation.el.find(".boarding-pass").show();
    }

    //event handler
    this.el.on("click","button", this.loadConfirmation);
    this.el.on("click",".view-boarding-pass", this.showBoardingPass);

}

$(document).ready(function(){
    //confirmation.init();
    var paris = new Confirmation($("#paris"));
    //paris.details();

    var london = new Confirmation($("#london"));
    //london.details();
});