const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkName() {
    const name = $("#name").val();

    if (name.length === 0) {
        $("#nameError").html("Név megadása kötelező!");
    } else {
        $("#nameError").html("");
    }
}

//checks if e-mail matches regexp and length not null
function checkEmail() {
    const email = $("#email").val();

    if (email.length === 0) {
        $("#emailError").html("Az e-mail cím megadása kötelező!");
    } else if (!emailRegex.test(email)) {
        $("#emailError").html("Nem érvényes e-mail cím!");
    } else {
        $("#emailError").html("");
    }
}

function checkPasswordMatch() {
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    if (password.length === 0) {
        $("#divCheckPasswordMatch").html("A jelszó megadása kötelező!");
    } else if (password !== confirmPassword) {
        $("#divCheckPasswordMatch").html("A jelszavak nem egyeznek!");
    } else {
        $("#divCheckPasswordMatch").html("");
    }
}

function checkTweetLength() {
    const tweet = $(this).val();
    const tweetButtonId = this.id === "newtweet" ? "#tweetBtn" : "#tweetModBtn";
    const tweetBtn = $(tweetButtonId);

    if (tweet.length === 0) {
        tweetBtn.prop("disabled", true);
    } else {
        tweetBtn.prop("disabled", false);
    }
}

$(document).ready(function () {
    $("#name").keyup(checkName);
    $("#email").keyup(checkEmail);
    $("#confirmPassword").keyup(checkPasswordMatch);
    $("#newtweet").keyup(checkTweetLength);
    $("#edittweet").keyup(checkTweetLength);

    $("#registerForm").submit(function (event) {
        const name = $("#name").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();

        checkName();
        checkEmail();
        checkPasswordMatch();

        if (name.length === 0 || password != confirmPassword || password.length === 0 || email.length === 0 || !emailRegex.test(email)) {
            event.preventDefault();
        }
    });

    $("#newPasswordForm").submit(function (event) {
        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();

        checkPasswordMatch();

        if (password != confirmPassword || password.length === 0) {
            event.preventDefault();
        }
    });
});

