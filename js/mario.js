// mario Left, chimenyLeft, chimeny Right 
var user;
var scr = 0;
var highest;
var imgSrc = ["/img/walking1.png", "/img/walking2.png", "/img/walking3.png"];
$(function () {
    // console.log("Start2")
    $("#gameover").hide();
    user = getCookie("currentUser");
    if (user) {
        console.log(user);
        user = JSON.parse(user);
        highest = user["marioHighscore"];
        str = "Score = " + scr + " Highest score =" + highest;
        $('#Score').html(str);
    }
    var WIN = 0,
        LOSE = 0;
    var Mute_image = '/img/noOmusic.png';
    var Music_on = "/img/mus.png";
    var Music_On_Off = 0;
    var Playing = $("audio")[1];
    $("#ReStart").click(function () {
        //  console.log("restart")
        location.reload(true);
    })
    $("#Music").click(function () {
        if (Music_On_Off === 0) {
            if (LOSE) Playing = $("audio")[2];

            $("#Music").attr("src", Music_on);
            Playing.play();
            Music_On_Off = 1;
        } else {
            // console.log("else ", Music_On_Off);
            $("#Music").attr("src", Mute_image);
            Music_On_Off = 0;
            Playing.pause();
        }

    })
    var m, ch, mL, mR, chL, chR, EndGame = 0;
    //    var MOVEE = setInterval(function () {
    //        movingEnemies();
    //        isCollidingWithEnemies();
    //    }, 2000)

    var flag = 0;
    var leftCase = 1;
    var lrInterval, jumpInterval;
    var prevK;
    var prevBottom;
    var y;
    var z;
    var chimenyName;
    var newBottom;
    var upFlag = 0,
        down = 0;
    var keyPFlag = 0;
    var LRFlag = 0;
    var step;
    var cnt = 0
    var onThechiemny = 0,
        onThechiemny1 = 0;
    var bot = 0;
    var jumpingStep = '+=2px';
    var js = 2;
    var jumpingFlag = 0;
    var t;
    var x = 0;
    var EnemyFlag = 0;
    var flagUp = 0;
    var DeathFlag = 0;
    var bgStep = '-=1px'
    var itemStep = '-=2px'
    var firstEnd = 1;

    function setMarioAndChimenyDimensions($mario, $chimeny) {
        m = $mario.position().top;
        mL = $mario.position().left;
        mR = $mario.position().left + $mario.width();
        ch = $chimeny.position().top;
        chL = $chimeny.position().left;
        chR = $chimeny.position().left + $chimeny.width();
    }

    function isColliding($s, $t) {
        var sOffset = $s.position();
        var sHeight = $s.height();
        var sRealTop = sOffset.top + sHeight;
        var sWidth = $s.width();
        var sRight = sOffset.left + sWidth;
        // Target collision
        var tOffset = $t.position();
        var tWidth = $t.width();
        var tHeight = $t.height();
        var tRealTop = tOffset.top + tHeight;
        var tRight = tOffset.left + tWidth;
        var colliding = !(sRight < tOffset.left || sOffset.left > tRight || sRealTop < tOffset.top || sOffset.top > tRealTop);
        // Return whether it IS colliding
        return colliding;
    }
    $('#b').keydown(function (e) {
        if (EndGame == 0) {
            if (e.key == 'ArrowRight') {
                rightKey();
                prevK = 'r';
            } else if (e.key == 'ArrowLeft') {
                leftKey();
                prevK = 'l';
            }
            isCollidingWithCoins();
            isCollidingWithEnemies();
        }
        if (EndGame == 1 && firstEnd == 1) {
            setHighestScore();
            scr = 0;
            firstEnd++;
            GoingHome();

            setTimeout(function () {
                $("#Message").text(" YOU  WIN ")
                $("#gameover").show();
            }, 4000)



        }
    });
    $('#b').keypress(function (e) {
        if ($("#mario").position().left <= 0) {
            $("#mario").css({
                "left": '0px'
            });
        }
        if (EndGame == 0) {
            if (e.key == ' ') {
                //  console.log(" key press (space )")
                setStep();
                //clearInterval(z);
                if (keyPFlag == 0) {
                    bot = 0;
                    keyPFlag = 1;
                    jumpingStep = '+=2px';
                    js = 2;
                    jumpingFlag = 0;
                    cnt = 0;
                    clearInterval(t);
                    t = setInterval(function () {
                            prevBottom = $("#mario").css("bottom");
                            isCollidingWithCoins();
                            isCollidingWithEnemies();
                            if (parseInt($("#mario").css("bottom")) < 40) {
                                $("#mario").css({
                                    bottom: '40px'
                                })
                            } //handle eno mayenzelsh aktar men 50;
                            var a = $("#theGame").css("background-position");
                            if (parseInt(a.split(" ")[0]) <= 0) {
                                if (isColliding($('#mario'), $('#chimeny'))) {
                                    checkCollidingInJump($('#mario'), $('#chimeny'))
                                } else if (isColliding($('#mario'), $('#chimeny1'))) {
                                    checkCollidingInJump($('#mario'), $('#chimeny1'))
                                } else if (isColliding($('#mario'), $('#tiles'))) {
                                    checkCollidingInJump($('#mario'), $('#tiles'))

                                } else if (isColliding($('#mario'), $('#CHHH'))) {
                                    checkCollidingInJump($('#mario'), $('#CHHH'))
                                } else if (isColliding($('#mario'), $('#chimeny4'))) {
                                    checkCollidingInJump($('#mario'), $('#chimeny4'))
                                } else if (isColliding($('#mario'), $('#chimeny3'))) {
                                    checkCollidingInJump($('#mario'), $('#chimeny3'))
                                } else if (isColliding($('#mario'), $('#tiles1'))) {
                                    checkCollidingInJump($('#mario'), $('#tiles1'))


                                } else {
                                    JumpNow();
                                }

                            }
                        },
                        10);
                }
            }
        }
    })
    $('#b').keyup(function () {

        clearInterval(lrInterval);
        flag = 0;
        prevK = 'n';
    });

    function JumpNow() {

        $("#mario").css({
            bottom: jumpingStep,
            left: step
        });
        bot += js;
        if (bot == 150 && !jumpingFlag) {
            jumpingFlag = 1;
            jumpingStep = '-=2px';
            js = -2;
        }
        if (bot == 0 && jumpingFlag) {
            keyPFlag = 0;
            clearInterval(t);
            clearInterval(z);
        }
        if ($("#mario").position().left <= 0) {
            $("#mario").css({
                "left": '0px'
            });
        }

    }
    //--------->
    function rightKey() {
        if (EndGame == 0) {
            var c = 0;
            if (!flag && !EndGame) {
                console.log("Right Key");
                clearInterval(lrInterval);
                lrInterval = setInterval(function () {
                    if (parseInt($("#mario").css("bottom")) < 40) {
                        $("#mario").css({
                            bottom: '40px'
                        })
                    }
                    isCollidingWithCoins();
                    flag = 1;
                    LRFlag = 0;
                    var arr = ['#chimeny', '#chimeny1', '#tiles', '#chimeny4', '#chimeny3', '#tiles1', '#CHHH'];
                    for (var i = 0; i < arr.length; i++) {
                        // console.log("arr i  ", i)
                        checkNotCollidingR($('#mario'), $(arr[i]));
                    }

                    c = (c + 1) % 3;
                    $("#mario").attr("src", imgSrc[c]);

                    if (!leftCase) {
                        $("#mario").css("transform", "scaleX(1)")
                        leftCase = 1;
                    }
                    var aboveFlag = 0;
                    for (var i = 0; i < arr.length; i++) {
                        if (Above7aga($('#mario'), $(arr[i])))
                            aboveFlag = 1;
                    }
                    if (!aboveFlag && upFlag) {
                        onThechiemny = 0;
                        marioGround = 0;
                        clearInterval(z);
                        z = setInterval(function () {
                            upFlag = 0;
                            down = 0;
                            var marioGround = 0;
                            for (var i = 0; i < arr.length; i++) {
                                if (Above7aga($('#mario'), $(arr[i]))) {
                                    marioGround = 1;
                                    clearInterval(z);
                                }
                            }

                            if (marioGround) {
                                for (var i = 0; i < arr.length; i++) {
                                    checkNotCollidingR($('#mario'), $(arr[i]))
                                }
                                clearInterval(z);
                            }
                            if (parseInt($("#mario").css('bottom')) > 40) {
                                $("#mario").css({
                                    bottom: '-=5px'
                                });
                            } else clearInterval(z);
                        }, 1);

                        upFlag = 0;
                    }
                    if (LRFlag == 0) {
                        if ($("#mario").position().left < 700) {
                            $("#mario").css({
                                left: '+=4px'
                            });
                        } else {
                            $("#mario").css({
                                left: '+=0px'
                            });
                        }

                        Moving_Bg(1);
                    }



                }, 60);
            }

        }
    }
    //<---------------------
    function leftKey() {
        if (EndGame == 0) {
            var c = 0;
            if (!flag) {
                clearInterval(lrInterval);
                lrInterval = setInterval(function () {
                    if (parseInt($("#mario").css("bottom")) < 40) {
                        $("#mario").css({
                            bottom: '40px'
                        })
                    }
                    isCollidingWithCoins();
                    flag = 1;
                    LRFlag = 0;
                    var arr = ['#chimeny', '#chimeny1', '#tiles', '#chimeny4', '#chimeny3', '#tiles1', '#CHHH'];
                    for (var i = 0; i < arr.length; i++) {
                        checkNotCollidingL($('#mario'), $(arr[i]));
                    }

                    c = (c + 1) % 3;
                    $("#mario").attr("src", imgSrc[c]);

                    if (leftCase) {
                        $("#mario").css("transform", "scaleX(-1)")
                        leftCase = 0;
                    }
                    var aboveFlag = 0;
                    for (var i = 0; i < arr.length; i++) {
                        if (Above7aga($('#mario'), $(arr[i])))
                            aboveFlag = 1;
                    }
                    console.log("above Flag", aboveFlag)
                    if (!aboveFlag && down) {

                        onThechiemny = 0;
                        marioGround = 0;
                        clearInterval(z);
                        z = setInterval(function () {
                            upFlag = 0;
                            down = 0;
                            var marioGround = 0;
                            for (var i = 0; i < arr.length; i++) {
                                if (Above7aga($('#mario'), $(arr[i]))) {
                                    clearInterval(z);
                                    marioGround = 1;
                                }
                            }

                            if (marioGround) {
                                for (var i = 0; i < arr.length; i++) {
                                    checkNotCollidingL($('#mario'), $(arr[i]))
                                }
                                clearInterval(z);
                            }
                            if (parseInt($("#mario").css('bottom')) > 40) {
                                $("#mario").css({
                                    bottom: '-=5px'
                                });
                            } else clearInterval(z);
                        }, 1);
                        down = 0;
                    }
                    if (LRFlag == 0) {
                        if ($("#mario").position().left < 700) {
                            $("#mario").css({
                                left: '-=4px'
                            });
                        } else {
                            $("#mario").css({
                                left: '-=0px'
                            });
                        }
                        Moving_Bg(-1);
                    }
                }, 60);
            }
        }
    }

    function isCollidingWithCoins() {
        var allElems1 = $('.coinClass');
        allElems1.each(function () {
            //console.log("collid ", (isColliding($("#mario"), $(this))))
            if (isColliding($("#mario"), $(this))) {
                if (Music_On_Off == 1)
                    $("audio")[0].play();
                $(this).remove(); //After Colliding with Coin, coin hides
                //var S = parseInt($("#Score").text());
                scr += 10;
                var str;
                if (user)
                    str = "Score = " + scr + " Highest score = " + highest;
                else
                    str = "Score = " + scr;
                $("#Score").text(str);
            }
        })
    }


    function movingEnemies() {
        $("#enem1").animate({
            left: "+=100"
        }, 1500, function () {
            isCollidingWithEnemies();
            $("#enem1").css("transform", "scaleX(1)")
            $("#enem1").animate({
                left: "-=100"
            }, 1500, function () {
                isCollidingWithEnemies();
                $("#enem1").css("transform", "scaleX(-1)")
                if (EnemyFlag == 1) {
                    isCollidingWithEnemies();
                    $("#enem1").animate({
                        "left": "-=40px"
                    }, 200);
                } else if (EnemyFlag == -1) {
                    isCollidingWithEnemies();
                    $("#enem1").animate({
                        "left": "+=40px"
                    }, 200);
                }
                EnemyFlag = 0;
            });
        });
    }


    function isCollidingWithEnemies() {

        var allElems1 = $('.enemy');
        var Lives = $('.live');
        var Del = 0,
            imLive;
        allElems1.each(function () {
            //console.log("Colliding Enemies flag ", DeathFlag)
            if (isColliding($("#mario"), $(this)) && !DeathFlag) {
                //   console.log("Collid mario with the enemy ");
                if (Lives.length == 1) {
                    imLive = Lives[0];
                    // $("#mario").effect("pulsate", "fast");
                    imLive.remove();
                    // console.log("Lives.length  ", Lives.length)

                    EndGame = 2;
                    $("#mario").effect("puff", "slow", function () {
                        $("#mario").remove();
                    });

                    $(".bg").hide();
                    setHighestScore();
                    scr = 0;
                    $("#Message").text(" Game Over");
                    $("#gameover").show();
                    Playing.pause();
                    LOSE = 1;
                    Playing = $("audio")[2];
                    if (Music_On_Off == 1) {

                        Playing.play();
                    }
                } else {
                    DeathFlag = 1;
                    setTimeout(function () {
                        DeathFlag = 0
                        console.log("time out")
                    }, 2000);

                    imLive = Lives[0];
                    $("#mario").effect("pulsate", "fast");
                    imLive.remove();
                    // console.log("Lives.length  ", Lives.length)
                }

            }
        });


    }

    function setStep() {
        if (prevK == 'l') {
            step = '-=1px' //law kan mashy na7yet el left han2as el left
        } else if (prevK == 'r') {
            step = '+=1px'; //law na7yet el right benzawed el left
        } else if (prevK == 'n')
            step = '+=0px'; //law wa2ef makano el left beyefdal zay mahowa we beynot fe                    makano
    }

    function Moving_Bg(direction) {
        if ($("#mario").position().left <= 0) {
            $("#mario").css({
                "left": '0px'
            });
        }
        //   ------------>  right
        if (direction == 1) {
            console.log("Moving right");
            EnemyFlag = 1;
            if ($("#mario").position().left >= 700) {

                itemStep = '-=4px';
                bgStep = '-=3.5px';
            } else {
                itemStep = '-=2px';
                bgStep = '-=1px';
            }

            $("#theGame").animate({
                "background-position": bgStep
            }, 10);

            var allElems = $('.bg').find(' *');
            allElems.each(function () {

                $(this).css("left", itemStep);
                if (parseInt($(this).css("left")) <= 0) {
                    //  console.log("Hiding")
                    $(this).hide();
                }
                if ($(this).attr("id") == "home" || $(this).attr("id") == "flag") {

                    if (parseInt($("#home").css("left")) <= 930) {
                        EndGame = 1;

                    }
                }
            });
        }
        //moving left <------ 
        if (direction == -1) {

            var a = $("#theGame").css("background-position");
            if (parseInt(a.split(" ")[0]) < 0) {
                EnemyFlag = -1;
                if ($("#mario").position().left <= 0) {
                    $("#mario").css({
                        "left": '0px'
                    });

                } else bgStep = '+=1px';

                $("#theGame").animate({
                    "background-position": bgStep
                }, 10);

                var allElems = $('.bg').find('*');
                allElems.each(function () {
                    if ($(this).attr("id") == "enem1") {
                        $(this).css("left", bgStep);
                    } else
                        $(this).css("left", bgStep);
                    if (parseInt($(this).css("left")) >= 0) {
                        $(this).show();
                    }
                });
                EnemyFlag = -1;

            }

        }


    }

    function GoingHome() {
        WIN = 1;
        Playing.pause();
        Playing = $("audio")[3];
        if (Music_On_Off == 1) {
            Playing.play();
        }

        var allElems = $('.bg').find(' *');
        allElems.each(function () {
            $(this).hide();
            $("#mario").css("left", "100px");
            if ($(this).attr("id") == "home" || $(this).attr("id") == "flag") {

                $(this).css("left", "500px");
                $(this).show();
            }
        });
        c = 0;
        $("#mario").css("bottom", '40px');
        clearInterval(Going)
        var Going = setInterval(function () {

            c = (c + 1) % 3;
            $("#mario").attr("src", imgSrc[c]);
            $("#mario").css("left", '+=8');

            if ($("#mario").position().left + 100 > $("#flag").position().left) {
                console.log("clearr");
                $("#mario").effect("bounce", "slow");
                $("#mario").effect("bounce", "slow");
                clearInterval(Going)

            }
        }, 150);

    }
    $("#Startb2a").click(function () {
        console.log("Start Again b2a")
        location.reload(true);
    })



    function checkCollidingInJump($s, $t) {

        //console.log("checkCollidingInJump with : ");
        clearInterval(z);
        newBottom = parseInt($t.css("bottom")) + $t.height();
        prevBottom = parseInt($s.css("bottom"));
        if (Math.abs(newBottom - parseInt($s.css("bottom"))) <= 5) {
            onThechiemny++;
            keyPFlag = 0;
            if (onThechiemny == 1) {
                $s.css('bottom', newBottom);
                keyPFlag = 0;
                clearInterval(t);
                clearInterval(z);


            } else {

                keyPFlag = 1;
                JumpNow();
            }
        } else {

            $("#mario").css('bottom', '40px');
            clearInterval(t);
            keyPFlag = 0;
        }
        upFlag = 1;
        down = 1;
    }

    function checkNotCollidingL($s, $t) {
        //  console.log("checkNotCollidingL")
        setMarioAndChimenyDimensions($s, $t);
        if (mR >= chR && mL >= chL && mL <= chR && (m >= (ch) && m > (ch - ($t.height()))) && isColliding($s, $t)) {
            var pos = ($t.position().left + ($t.width()));
            $s.css("left", pos);
            LRFlag = 1;
        }
    }

    function checkNotCollidingR($s, $t) {

        setMarioAndChimenyDimensions($s, $t);
        if (mR <= chR && mL <= chL && mR >= chL && (m >= (ch) && m > (ch - ($t.height()))) && isColliding($s, $t)) {
            var pos = ($t.position().left - ($t.width()));
            $s.css("left", pos);
            LRFlag = 1;
        }
    }

    function Above7aga($s, $t) {

        setMarioAndChimenyDimensions($s, $t);
        var Mar_bottom = parseInt($s.css('bottom'));
        var T_bottom = (parseInt($t.css('bottom')) + $t.height());
        if (Math.abs(Mar_bottom - T_bottom) <= 5 && mR >= chL && mL <= chR) {

            $s.css('bottom', (T_bottom + 'px'));
            clearInterval(z);
            upFlag = 1;
            down = 1;
            return true;
        } else
            return false;
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
            highest = user["marioHighscore"];
            str = "Score = " + scr + " Highest score =" + highest;
            $('#Score').html(str);

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
                if (scr > user["marioHighscore"]) {
                    user["marioHighscore"] = scr;
                    user = JSON.stringify(user);
                    var today = new Date();
                    today.setMonth(today.getMonth() + 2);
                    setCookie(userId, user, today)
                    setCookie("currentUser", user);
                }
            }
            user = getCookie("currentUser");
            user = JSON.parse(user);
            highest = user["marioHighscore"];
        }

    }



});
