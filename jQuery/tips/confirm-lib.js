/*
http://myclabs.github.io/jquery.confirm/

*/


/**

<script src="js/jquery.confirm.js"></script>
Write your links (also works for buttons):

<a href="home" class="confirm">Go to home</a>
Enable the confirmation dialogs:

$(".confirm").confirm(); 

**/

/**
example: 
<button class="confirm" type="button">Delete the comment</button>
**/


$(".confirm").confirm({
    text: "Are you sure you want to delete that comment?",
    title: "Confirmation required",
    confirm: function(button) {
        // do something
    },
    cancel: function(button) {
        // do something
    },
    confirmButton: "Yes I am",
    cancelButton: "No",
    post: true
})

/**
text: Text to display in the dialog
title: Title of the dialog (can be empty, the dialog will not have a header then)
confirm: Handler executed when the user confirms
cancel: Handler executed when the user cancels
confirmButton: Label of the confirm button
cancelButton: Label of the cancel button
post: If false (default) and no confirm handler is set, redirects the user to the URL of the 
button/link with a GET request. If true, redirects with a POST request (like a form submission).
**/
