/*
* CMPE 280- SCO
* Xiaoli Jiang 009390901
* */

//handle cancel and clear selection
//var clear_btn = document.getElementById("clear_btn");
//clear_btn.onclick(function (e) {
//    e.preventDefault();
//
//});


$("#clear_btn").click(function (e) {
    e.preventDefault();
    $("input[type='radio']").prop('checked', false);
});

/******************** handle login page  ******************/
$("#login_form").submit(function (e) {
    e.preventDefault();

    //refresh local storage when a new user login
    localStorage.clear();

    //store username
    localStorage.username = $("input[name='username']").val();
    $("#user_name").html(localStorage.username);

    //redirect to math question page
    window.location.replace("math1.html");
});

/******************** handle math question  ******************/
var math_answer;
$("input:radio[name=math]").click(function() { math_answer = $(this).val(); });
$("#math_form").submit(function (e) {
    e.preventDefault();

    //init score
    localStorage.sec1_score = 0;
    localStorage.sec1_num_answered = 0;
    localStorage.sec1_num_correct = 0;
    //check math answer
    if(math_answer !== "") {
        localStorage.sec1_num_answered++;
    }
    //update score: right answer d
    if(math_answer === "d") {
        localStorage.sec1_num_correct++;
        localStorage.sec1_score = parseInt(localStorage.sec1_score) +50;
    }

    //redirect to cosine question page
    window.location.replace("cosine.html");
});

/******************** handle cosine question  ******************/
var cos_answer;
$("input:radio[name=cosine]").click(function() { cos_answer = $(this).val(); });
$("#cosine_form").submit(function (e) {
    e.preventDefault();

    //check math answer
    if(cos_answer !== "") {
        localStorage.sec1_num_answered++;
    }

    //update score: right answer a
    if(cos_answer === "a") {
        localStorage.sec1_num_correct++;
        localStorage.sec1_score = parseInt(localStorage.sec1_score) +50;
    }

    //redirect to english question page
    window.location.replace("english.html");
});

/******************** handle english question page ******************/
//init english page
$("#options1").hide();
$("#options2").hide();

//show options1 when click on blank1
$("#blank1").click(function (e) {
    $("#options2").hide();
    $("#options1").show();
});
//show options2 when click on blank2
$("#blank2").click(function (e) {
    $("#options1").hide();
    $("#options2").show();
});

//handle english submit
var english_answer1;
$("input:radio[name=blank1]").click(function() { english_answer1 = $(this).val(); });
var english_answer2;
$("input:radio[name=blank2]").click(function() { english_answer2 = $(this).val(); });
$("#english_form").submit(function (e) {
    e.preventDefault();

    //init score
    localStorage.sec2_score = 0;
    localStorage.sec2_num_answered = 0;
    localStorage.sec2_num_correct = 0;

    //check math answer
    //update score: right answer 650 & Twitter
    if(english_answer1) localStorage.sec2_num_answered++;
    if(english_answer1 === "650") {
        localStorage.sec2_num_correct++;
        localStorage.sec2_score = parseInt(localStorage.sec2_score) +50;
    }

    if(english_answer2) localStorage.sec2_num_answered++;
    if(english_answer2 === "Twitter") {
        localStorage.sec2_num_correct++;
        localStorage.sec2_score = parseInt(localStorage.sec2_score) +50;
    }

    //redirect to video question page
    window.location.replace("video.html");
});

/******************** handle video question page ******************/
var video_answer;
$("input:radio[name=video]").click(function() { video_answer = $(this).val(); });
$("#video_form").submit(function (e) {
    e.preventDefault();

    //init score
    localStorage.sec3_score = 0;
    localStorage.sec3_num_answered = 0;
    localStorage.sec3_num_correct = 0;

    //check math answer
    if(video_answer !== "") {
        localStorage.sec3_num_answered = 1;
    }

    //update score: right answer a
    if(video_answer === "a") {
        localStorage.sec3_num_correct = 1;
        localStorage.sec3_score = 100;
    }

    //redirect to survey page
    window.location.replace("survey.html");
});


/******************** handle survey page ******************/
$("#survey_btn").click(function (e) {
    e.preventDefault();

    //store form data
    var surveyresult = $("#survey_form").serializeArray();
    localStorage.comm = surveyresult[0].value;
    localStorage.city = surveyresult[1].value;
    localStorage.room = surveyresult[2].value;

    //redirect to summary question page
    window.location.replace("summary.html");
});

$("#skip_btn").click(function (e) {
    e.preventDefault();
    //clear storage
    delete localStorage.comm;
    delete localStorage.city;
    delete localStorage.room;

    //redirect to summary question page
    window.location.replace("summary.html");
});

/******************** Summary page DOM ******************/
//init summary page
$("#summ_user").html(localStorage.username);
//section1 summary
$("#sec1_num_answered").html(localStorage.sec1_num_answered);
$("#sec1_num_correct").html(localStorage.sec1_num_correct);
$("#sec1_score").html(localStorage.sec1_score);
//section2 summary
$("#sec2_num_answered").html(localStorage.sec2_num_answered);
$("#sec2_num_correct").html(localStorage.sec2_num_correct);
$("#sec2_score").html(localStorage.sec2_score);
//section3 summary
$("#sec3_num_answered").html(localStorage.sec3_num_answered);
$("#sec3_num_correct").html(localStorage.sec3_num_correct);
$("#sec3_score").html(localStorage.sec3_score);
//survey summary
$("#survey_comm").html(localStorage.comm);
$("#survey_city").html(localStorage.city);
$("#survey_room").html(localStorage.room);

/******************** Debug ******************/
//debug username
console.log(localStorage.username);
//section1 debug
console.log(localStorage.sec1_num_answered);
console.log(localStorage.sec1_num_correct);
console.log(localStorage.sec1_score);
//section2 debug
console.log(localStorage.sec2_num_answered);
console.log(localStorage.sec2_num_correct);
console.log(localStorage.sec2_score);
//section3 debug
console.log(localStorage.sec3_num_answered);
console.log(localStorage.sec3_num_correct);
console.log(localStorage.sec3_score);
//survey debug
console.log(localStorage.comm);
console.log(localStorage.city);
console.log(localStorage.room);