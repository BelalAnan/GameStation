$(function () {



    var progressbar = $("#progressbar"),
        progressLabel = $(".progress-label");

    progressbar.progressbar({

        value: false,
        change: function () {
            progressLabel.text(progressbar.progressbar("value") + "%");
        },
        complete: function () {


            console.log("complete");
            progressLabel.text("Complete!");

            $(progressbar).hide();
            $(progressLabel).hide();

            //$("Start").empty();


        }




    });




    function progress() {
        var val = progressbar.progressbar("value") || 0;

        progressbar.progressbar("value", val + 2);

        if (val < 99) {
            setTimeout(progress, 80);
        }
    }

    setTimeout(progress, 2000);


});

setTimeout(function () {
    var Start = document.createElement("button");
    Start.textContent = " Start Game ";

    $(Start).addClass("btn");
    // $("#Start").append(Start);
    document.body.appendChild(Start);

    $(Start).click(function () {

        var v = document.getElementById("super");
        if (v) {
          window.location.replace("Demo.html");
        }else{
        window.location.replace("hangman.html");   
        }
    })

}, 6700);
