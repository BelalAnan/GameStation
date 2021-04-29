var arr = ["img/super-mario-game_copy_-_h_2017-928x523.jpg", "img/hangmanbannerpic.png", "img/ABClassicLoadingScreenV4.jpg"];
var links = ["SuperMFrame.html", "hangmanframe.html", "iframetrial.html"];
var flag=0;
var i = 0;
var interval ;
$(document).ready(function () {
    changesrc();
    interval = setInterval(function () {
       $("#slide").fadeIn(2000);

        changesrc();

       // $("#slide").fadeOut(2000);
    }, 2000);

    $("html").click(function (e) {

        console.log(typeof (this));
        if ($(e.target).attr('id') == 'Game') {

            /* console.log("hh");
             $("#content").css({"display":"block"})*/
            myFunction1(_this);
        } else {

            console.log("h");
            $("#content").css({
                "display": "none"
            });
            $("#Game").css({
                backgroundColor: "#12232E"
            });
        }

    });
    
    $("#logout").hide();
    $("#username").hide();
    var user = getCookie("currentUser");
    console.log("HERE");
    if (user) {
            console.log("HERE2");
        user = JSON.parse(user);
        if (user["FirstName"] != null) {
            $("#Reg").hide();
            $("#login").hide();
            $("#logout").show();
            $("#username").show();
            $("#username").html(user["FirstName"]);
            console.log("hey");
        }
    }


});



function changesrc() {

    $("#slide").attr("src", arr[i]);

    $("#ImgSrc").attr("href", links[i]);
    i++;
    console.log(i);
    if (i == 3) {
        i = 0;
    }
}

function decreasesrc() {
     i--;
    if (i == -1) {
        i = 2;
    }
   
    $("#slide").attr("src", arr[i]);
    $("#ImgSrc").attr("href", links[i]);
    
    console.log(i);
    
}
function logout(){
    setCookie("currentUser", " ");
    $("#Reg").show();
    $("#login").show();
    $("#logout").hide();
    $("#username").hide();
}


function functionright() {
     clearInterval(interval);
    changesrc();
    newInterval();
}


function functionleft() {
     clearInterval(interval);
  decreasesrc();
    newInterval();
}


function myFunction(_this) {

    console.log(_this);
    $("a.active").removeClass("active");
    $("#Game").css({
        backgroundColor: "#12232E"
    });
    $(_this).addClass("active");
    $("#content").css({
        "display": "none"
    });

    /* $("a").on("click", function() {
          console.log(this);
          $("a.active").removeClass("active");
          $(this).addClass("active");
     });*/
}


function myFunction1(_this) {

    console.log(_this);

    $("a.active").removeClass("active");

    $(_this).css({
        backgroundColor: "#203647"
    });


    $("#content").toggle();

    /*   $('body :not(#top)').click(function() {
     console.log("hh");
});
      */

    /*   $("body").click(function(event) {
    if (event.target.id === 'top') {
       $("#content").css({"display":"block"});
    }
        else{ $("#content").css({"display":"none"})}
});
    */





};

function newInterval(){
    interval= setInterval(function () {
        if(!flag){
        $("#slide").fadeIn(2000);

        changesrc();

        $("#slide").fadeOut(2000);}
    }, 4000);

}

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
