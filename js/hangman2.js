var i=0;
var j=0;
var random;
var random2;
var ran;
var x;
var myimages=["img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png"];

var mychoice=
{
   films:["cast away","the dark knight","alien","click","the day after tomorrow"],
   cities : ["istanbul","copenhagen","new york","london","ulm"],
   football_clubs:["barcelona","napoli","arsenal","nice","wegan"],
   
}

var choices = ["cities","films","football_clubs"];

var cities=["istanbul","Copenhagen","newyork","london","ulm"];

var films=["cast away","the dark knight","alien","click","the day after tomorrow"];

var football_clubs=["barcelona","napoli","arsenal","nice","wegan"];

var imgI= 1;
var c2=[cities,films,football_clubs];
var cnt =0;
var ans=[];
var i=0;
var key =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

$(document).ready(function(){
    
   /* window.resizeTo(100,100);
   /* Generate buttons*/
   
    for(var i=0;i<key.length;i++)
    {
       $("#div2").append("<input type= 'button'  onclick='generateletter(this.value, this.id);'   value='" +
      key[i] +  "' id='"+key[i] +"'> ");
    }
    
    $("input").mouseover(function()
    {
        $(this).css("background","  #AAB6A2").css("color","white");

    })
    
     
    $("input").mouseout(function()
    {
        $(this).css("background","white").css("color","darkslategray");
    })
    
    
    $("#div3").append("<img id='img3' src='img/1.png'>")
   
    ran = $("#myselect").val();

    console.log("ran is " + ran);
   
    $("#myselect").change(function() {
        $("#d1").show();
        $("#hint").empty();
        ran = $("#myselect").val();


        console.log("ran is " + ran);
        random=Math.floor(Math.random()*mychoice[ran].length);
        x=mychoice[ran][random];
        
        console.log(random);
        console.log(x);
        $("#d1").empty();
        
        for(i=0;i<x.length;i++)
        {
            
            if(x[i]==' ')
           {
            $("#d1").append(" <img id='img1' src='img/underscore.png' style='visibility:hidden'>")
            cnt++;
            ans[i]=' ';
           }
            
           else
            $("#d1").append(" <img id='img1' src='img/underscore.png'>")
         }
    

     })
    
   
   
     
  
});


function playagain()
{

    $("#myselect").val('');
       $("#hint").empty();
       $("#div2").empty();
       $("#d1").hide();
       $("#s1").empty();
        cnt =0;
        ans=[];
        i=0;
        ran = "";
        random= null;
    x=null;

       for(var i=0;i<key.length;i++)
       {
          $("#div2").append("<input type= 'button'  onclick='generateletter(this.value, this.id);'   value='" +
          key[i] +  "' id='"+key[i] +"'> ");
       }
       $("#div3").empty();
       $("#div3").append("<img id='img3' src='img/1.png'>")
       imgI=1;
       $("input").mouseover(function()
       {
           $(this).css("background","  #AAB6A2").css("color","white");
   
       })
       
       $("input").mouseout(function()
       {
           $(this).css("background","white").css("color","darkslategray");
       })


}


function generateletter(val, id)
{
  
  if(ran=="")
  {
      $( "#dialog2" ).html("choose categouy first").dialog();

  }
if(ran){
  var y=mychoice[ran][random];
  var i = 0;
  var flag = 0;
  console.log(id);
    
  $('#'+id).css({
      
      "pointer-events" : 'none',
      "cursor": "not-allowed",
      "opacity": "0.65"
  })

  $('#d1').children().each(function(){
    if(val==y[i]){
        flag = 1;  
        $(this).replaceWith("<h2 style='display: inline;position:relative; left:1px; bottom:20px '> " + val+ "</h2>") 
        ans[i]=y[i];
    }

i++; 
})
    
  if(!flag &&imgI<7){
      imgI++;
       playaudioerror();
      var src='img/'+ imgI+ '.png';
      $("#img3").attr('src', src)
   }
       
  if(imgI==7) {
      playaudioLose();
    $( "#dialog" ).html("You lose, the word  is  " + y).dialog();

   
  }
  $('#dialog').on('dialogclose', function(event) {
      ran="";
   playagain();
});

  if(ans.join('')==y){     
    $( "#dialog1").html("You WIN!").dialog();
    playaudiowin();
  }
  $('#dialog1').on('dialogclose', function(event) {
    ran="";
 playagain();
});

}

  
}


function showhint()
{
    if(x=="istanbul")
    {
        $("#hint").empty();
        $("#hint").html("The Highest Population City In Europe ");
    }
    
    else if(x=="copenhagen")
    {
        $("#hint").empty();
        $("#hint").html("The Capital Of Denmark ");

    }else if(x=="new york")
    {
        $("#hint").empty();
        $("#hint").html("The City With The Most Millionaires In The World ");
    }else if(x=="london")
    {
        $("#hint").empty();
        $("#hint").html("A city Famous Of Foggy Weather ");

    }else if(x=="ulm")
    {
        $("#hint").empty();
        $("#hint").html("A City Where Albert Einstein was born ");
    }else if(x=="cast away")
    {
        $("#hint").empty();
        $("#hint").html("2000 American  Drama Film By Tom Hanks ");
    }else if(x=="the dark knight")
    {
        $("#hint").empty();
        $("#hint").html(" A 2008 Superhero Film ");

    }
    else if(x=="alien")
    {
        $("#hint").empty();
        $("#hint").html("Science Fiction Horror Film ");

    }
    else if(x=="click")
    {
        $("#hint").empty();
        $("#hint").html(" 2006 American Fantasy Comedy-Drama Film By Adam Sandler ");

    }
    else if(x=="the day after tomorrow")
    {
        $("#hint").empty();
        $("#hint").html(" A 2004 American science climate fiction disaster film ");

    }else if(x=="barcelona")
    {
        $("#hint").empty();
        $("#hint").html("Club Won Champions League 2009");

    }
    else if(x=="napoli")
    {
        $("#hint").empty();
        $("#hint").html("A Famous Club In Italy");

    }
    else if(x=="arsenal")
    {
        $("#hint").empty();
        $("#hint").html("Owned by A russian Billionaire");

    }else if(x=="nice")
    {
        $("#hint").empty();
        $("#hint").html("French Football Club ");

    }else if(x=="wegan"){
         $("#hint").empty();
        $("#hint").html("English  Football Club ");    
    }
}
function playaudioLose()
{
    var bMusic = new Audio('1.aac');
	bMusic.play()
}
function playaudioerror()
{
    var bMusic = new Audio('2.aac');
	bMusic.play()
}
function playaudiowin()
{
    var winmusic=new Audio('win.aac');
    winmusic.play();
}