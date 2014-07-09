/*
	Code school jQuery AJAX class
	07/05 XJ
*/

/*function Vacation(destination){
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
            }
        });
    }
    this.showBoardingPass = function(event){
        event.preventDefault();
        $(this).hide();
        confirmation.el.find(".boarding-pass").show();
    }

    //event handler
    this.el.on("click","button", this.loadConfirmation);
    this.el.on("click",".view-boarding-pass", this.showBoardingPass);

}

$(document).ready(function(){

    var paris = new Confirmation($("#paris"));
    var london = new Confirmation($("#london"));

    var submitFrom = function(event){
        event.preventDefault();
        var form = $(this);
        //$.ajax("book.html", {
        //same with the form action in html - DRY
        $.ajax($("form").attr("action"),{
            type: "POST",
            data: form.serialize(),
            dataType:"json",
            success: function(result){
                console.log("result"+result);
                form.remove();

                var msg= $("<p></p>");
                msg.append("Destination" + result.location + ". ");
                msg.append("Days" + result.quantity + ". ");

                $("#vacation").hide().html(msg).fadeIn();
            },
            contentType: "application/json"
        });
    };


    var updateFlights = function(){
        console.log('in get time click');
        $.getJSON('flights.html',function(result){
            //console.log('in get json');
            var flightElement = $.map(result, function(item, index){
                //console.log('in map:' + index);
                var flightEl= $('<li>'+item.flightNumber+'-'+item.time+'</li>');
                return flightEl;
            });
            $('.flight-times').detach().html(flightElement).appendTo('.flights');
        });
    };

    var showPrice = function () {
        $(this).off(".price");
        //$(".vacation").off("show.price");
        var vacation = $(this).closest(".vacation");
        var price = vacation.data("price");
        var details = $("<p>Book 3 days for $"+(3*price)+"</p>");
        vacation.append(details);
    };

    $("form").on("submit", submitFrom);

    $('.update-flights').on('click', updateFlights);

    $(".vacation").on("click.price", "button", showPrice);
    $(".vacation").on("show.price", showPrice);

    $(".show-prices").on("click", function(event){
        event.preventDefault();
        $(".vacation").trigger("show.price");
    });

});