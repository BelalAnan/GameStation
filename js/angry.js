var timer = 100;
var x = 0;
var score = 0;
var gameOver = new Audio('gameover.wav');
var pew = new Audio('pew-pew-lame-sound-effect.mp3');
var level = 0;
var l;
var outInterval = [];
var t = [];
var i = 1;
var z = 2000;
var user;
var highest;
var stopInterval = 1;
var newBirdsInterval;
$(function () {
    $("#gameover").hide();
    $("#level").hide();
    $("#youwin").hide();
    user = getCookie("currentUser");
    if (user) {
        console.log(user);
        user = JSON.parse(user);
        highest = user["angryHighscore"];
        str = "Score = " + score + " Highest score =" + highest;
        $('#scr').html(str);
    }
    newBirdsInterval = setInterval(function () {
        var m = Math.floor(Math.random() * (2) + 1);
        if (!stopInterval) {
            //  stopInterval = 1;
            rs = Math.floor(Math.random() * (150) + 70);
            if (level) {
                l = Math.floor(Math.random() * (2) + 1);
            }
            if (l == 2 && level) {
                $('#b').append("<img id='" + i + "' src='img/yellow.png' class='yellow' unselectable='on' onclick=wrongBird(this.id) width='100px' height='100px' style='position: absolute; bottom:" + rs + "px;'/>");
                moveBird(i);
                i++
                x++;
            } else {
                while (m--) {
                    rs = Math.floor(Math.random() * (150) + 1);
                    $('#b').append("<img id='" + i + "' src='img/Red.png' class='red' onclick=hideBird(this.id) width='100px' height='100px' unselectable='on'  style='position: absolute; bottom:" + rs + "px;'/>");
                    moveBird(i);
                    i++
                    x++;
                }

            }
            if (x % 2 == 0 && timer > 20) {
                timer -= 10;
            }
            if (z > 300) {
                z -= 100;
            }
        }
    }, z)



})

function hideBird(x) {
    //console.log(x);
    $('#' + x).remove();
    pew.play();
    score += 10;
    if (user)
        str = "Score = " + score + "Highest score = " + highest;
    else
        str = "Score = " + score;
    $('#scr').html(str);
    if (score % 200 == 0) {
        if (level == 1) {
            stopInterval = 1;
            $("#youwin").show('explode', 500);
            $('#b').empty();
            level = 0;
            setHighestScore();

        } else {
            level = 1;
            stopInterval = 1;
            $("#level").show('explode', 500);
            $('#b').empty();
            setTimeout(function () {
                resetGame();
                console.log(stopInterval);
                $("#level").hide();
                stopInterval = 0;
            }, 2000)

        }
    }
}
var j = 1;

function wrongBird(x) {
    $('#' + x).remove();
    pew.play();
    $("#l" + j).hide();
    j++;
    if (j == 4) {
        console.log("Game Over");
        gameOver.play();
        stopInterval = 1;
        level = 0;

        $("#gameover").show('explode', 500)
        $('#b').empty();
        setHighestScore();
    }

}

function moveBird(i) {
    var rt = Math.floor(Math.random() * (150) + 100);
    var initB = parseInt($('#' + i).css('bottom'));
    var left = parseInt($('#' + i).css('left'));
    //int = 0;
    var op = '+';

    outInterval.push(setInterval(function () {
        //op = '+';
        var leftrnd = Math.floor(Math.random() * (4) + 4);
        t.push(setInterval(function () {
            $('#' + i).animate({
                "left": "+=" + leftrnd + "px",
                "bottom": op + '=4px'
            }, timer, "swing")
            if ((parseInt($('#' + i).css('bottom')) >= 500 || (parseInt($('#' + i).css('bottom')) - initB >= rt)) && op == '+') {

                $('#' + i).stop(true);
                op = '-';
            }

            if (op == '-' && (parseInt($('#' + i).css('bottom')) <= initB || parseInt($('#' + i).css('bottom')) <= 50)) {

                $('#' + i).stop(true);
                op = '+';
            }

            left = parseInt($('#' + i).css('left'));
            if (left >= 900) {
                $('#' + i).stop(true);
                

                if ($('#' + i).attr('class') == 'red') {
                    $("#l" + j).hide();
                    j++;
                    if (j == 4) {
                        stopInterval = 1;
                        gameOver.play();

                        $("#gameover").show('explode', 500)
                        $('#b').empty();
                        setHighestScore();
                        //  clearInterval(newBirdsInterval);
                    }
                    

                }
                $('#' + i).remove();
                clearInterval(outInterval[i-1]);
                clearInterval(t[i-1]);
            }
        }, 100))
    }, 100))
}

function resetGame() {
    if (level == 0) {
        score = 0;
    }
    $("#gameover").hide();
    $("#youwin").hide();
    $("#start").hide();
    for(var i in outInterval){
        clearInterval(outInterval[i]);
         clearInterval(t[i]);
    }
    outInterval = [];
    t = [];
   
    $("#l1").show();
    $("#l2").show();
    $("#l3").show();
    j = 1;
    stopInterval = 0;
    if (user)
        str = "Score = " + score + "Highest score = " + highest;
    else
        str = "Score = " + score;
    $('#scr').html(str);
    z = 2000;
    timer = 90;

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

function setHighestScore() {
    console.log(user);
    user = getCookie("currentUser");
    console.log(user);
    if (user) {
        var arr = [];
        console.log(user);
        user = JSON.parse(user);
        highest = user["angryHighscore"];
        str = "Score = " + score + " Highest score =" + highest;
        $('#scr').html(str);

        var noOfUsers = parseInt(getCookie("count"));
        var str = "user";
        for (var i = 1; i <= noOfUsers; i++) {
            var userX = getCookie(str + i);
            arr.push(JSON.parse(userX));
        }
        var flag = 0;
        var userId;
        for (var i = 0; i < arr.length; i++) {
            // console.log(arr[i]["Email"]);
            if (arr[i]["Email"] == user["Email"]) {
                flag = 1;
                console.log("here");
                i++;
                userId = "user" + i;
            }

        }
        if (flag == 1) {
            if (score > user["angryHighscore"]) {
                user["angryHighscore"] = score;
                user = JSON.stringify(user);
                var today = new Date();
                today.setMonth(today.getMonth() + 2);
            
                setCookie(userId, user, today)

                setCookie("currentUser", user);
            }
        }
        user = getCookie("currentUser");
        user = JSON.parse(user);
        highest = user["angryHighscore"];
    }

}
