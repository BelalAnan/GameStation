/*function display()
{
    if($("#pass1").val()==$("#pass2").val())
    {
        location.replace("ourwebsite.html");
    }else
    {
       $("#confirmation").html("Those passwords didn't match. Try again.")
       $("pass2").val("");
       
    }
    
}*/
var matches;
var email;
var fname;
var lname;
var g;

function validation() {
    fname = $("#unm").val();
    lname = $("#unml").val();
    pass = $("#pass1").val();
    g = $("input[name='gender']:checked").val();

}



function checkphone() {

    var mobilenumber = $("#phone").val();

    matches = mobilenumber.match(/^01[0-2][0-9]{8}$/);

}

function checkmail() {
    email = $("#mail").val();
    var regex = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+@[a-z]{5,7}\.[a-z]{3}$/g;
    email = email.match(new RegExp(regex));
}

$(function () {

    $("#check1").click(function () {
        if ($(this).is(":checked")) {
            validation();
        }
    });

});

var count = 0;

$('#myform').submit(function () {
    //    if($("#pass1").val()==$("#pass2").val()&&($("#check1").attr("checked"))&&(matches!=null)&&(email!="")&&(fname!="")&&(lname!="")&&(g!="")&&(g!=undefined))
    //    {
    //        return true; 
    //    }
    //    else 
    //    {
    var arr = [];
    email = $("#mail").val();
    mobilenumber = $("#phone").val();

    matches = mobilenumber.match(/^01[0-2][0-9]{8}$/);

    if ($("#pass1").val() != $("#pass2").val()) {
        $("#confirmation").html("Those passwords didn't match. Try again.");
        return false;

    }
    if ($("#check1").is(':not(:checked)')) {
        $("#termcondition").html(" warning : please check the term condition to continue");
        return false;
    }

    if (matches == null) {
        $("#dialog2").dialog();
        return false;
    }
    if (email == "") {
        $("#dialog").dialog();
        return false;
    } else {
        //console.log(email);
        var noOfUsers = parseInt(getCookie("count"));
        var str = "user";
        for (var i = 1; i <= noOfUsers; i++) {
            var user = getCookie(str + i);
            arr.push(JSON.parse(user));
        }
        var flag = 0;
        for (var i = 0; i < arr.length; i++) {
           // console.log(arr[i]["Email"]);
            if (arr[i]["Email"] == email) {
                flag = 1;
            }

        }
        if (flag == 1) {
            console.log("here");
            $("#dialog6").dialog(); 
            return false;
        }

        email = $("#mail").val();
        var regex = /^[a-z]([a-z]||[0-9])*@([a-z]||[0-9])*\.com$/;
        console.log(email)
        email = email.match(new RegExp(regex));
        console.log(email)
        if (email == null){
            $("#dialog").dialog()
            return false;
        }
    }
    if (fname == "") {
        $("#dialog3").dialog();
        return false;

    }
    if (lname == "") {
        $("#dialog4").dialog();
        return false;

    }
    if (g == "" || g == undefined) {
        $("#dialog5").dialog();
        return false;

    }

    //3   }

    var User = {
        "FirstName": $("#unm").val(),
        "LastName": $("#unml").val(),
        "Password": $("#pass1").val(),
        "Email": $("#mail").val(),
        "PhoneNumber": $("#phone").val(),
        "Gender": document.querySelector('input[name="gender"]:checked').value,
        "marioHighscore": 0,
        "angryHighscore": 0,
        "hangmanWon": 0
    }
    var noOfUsers;
    if (hasCookies("count")) {
        noOfUsers = parseInt(getCookie("count"));
        noOfUsers++;
    } else {
        setCookie("count", 1);

        noOfUsers = 1;
    }
    var newUser = "user" + noOfUsers;
    var today = new Date();
    var newMonth = today.getMonth() + 2;
    today.setMonth(newMonth);
    
    var newUserData = JSON.stringify(User);
    setCookie(newUser, newUserData, today);
    setCookie("count", noOfUsers, today);
    setCookie("currentUser", newUserData);
    return true;


});


function getCookie(cookieName) {
    if (!arguments[0])
        throw "Not enough arguments";
    var cookieAs = [];
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        cookieAs[cookies[i].split('=')[0].trim()] = cookies[i].split('=')[1];
    }
    return cookieAs[cookieName];
}

function setCookie(cookieName, cookieValue, expiryDate) {
    if (!arguments[0] || !arguments[1])
        throw "Not enough arguments";
    if (expiryDate)
        document.cookie = cookieName + '=' + decodeURIComponent(cookieValue) + ';expires=' + expiryDate.toUTCString() + ';';
    else
        document.cookie = cookieName + '=' + decodeURIComponent(cookieValue) + ';';

}

function deleteCookie(cookieName) {
    if (!arguments[0])
        throw "Not enough arguments";
    var date = new Date();
    date.setMonth(date.getMonth() - 1);
    document.cookie = cookieName + '=;expires=' + date.toUTCString() + ';';
}

function hasCookies(cookieName) {
    if (!arguments[0])
        throw "Not enough arguments";
    var re = document.cookie.indexOf(cookieName);
    if (re > -1)
        return true;
    else return false;
}
