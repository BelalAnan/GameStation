 var str;


function enter(e){
    if(e && e.keyCode==13){
        FAction();
    }
}

 function FAction() {
     str = $("#S").val();
     console.log(str);

     if (str == "Angry Bird" || str == "angry bird" || str == "Angry bird" || str == "angry Bird") {

         $('#SForm').attr('action', 'iframetrial.html');
         console.log(str);
         console.log("1");

         $("#SForm").submit();
     } else if (str == "Hang Man" || str == "hang man" || str == "Hang man" || str == "hang Man" || str == "hangman" || str == "Hangman" || str == "HANGMAN") {
         console.log(str);
         console.log("2");
         $('#SForm').attr('action', 'hangmanframe.html');
         $("#SForm").submit();
     } else if (str === "Super Mario" || str === "super mario" || str === "Super mario" || str === "super Mario") {
         console.log(str);
         console.log("4");
         $("#SForm").attr('action', 'SuperMFrame.html');
         $("#SForm").submit();
     } else if (str === "") {

         $("#SForm").attr("action", "#");
         console.log(str);

         $("#SForm").submit();
         console.log("space");
     } else {
         console.log(str);

         $("#SForm").attr("action", "NotFound.html");
         $("#SForm").submit();
         console.log("5");
     }

 }

