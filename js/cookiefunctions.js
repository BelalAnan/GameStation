function getCookie(Cookiename)
{
    var nameEQ = Cookiename + "=";
    var co = document.cookie.split(';');
    for(var i = 0 ; i < co.length ;i++) 
    {
        var c = co[i];
        while (c.charAt(0)==' ')
           c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) 
           return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function hasCookie(cookieName)
{
   var cname=getCookie(cookieName);
   if(cname==null)
   return false;
   else
   return true;
}
function allCookieList()
{
    var doCookie = document.cookie;
    var j = 0;
    var cookieArr = [];
    var arr = doCookie.split(";");
    for(var i = 0 ; i < arr.length ; i++)
    {
        var temp = arr[i].split("=");
        cookieArr[i] = temp[1];
        j++;
    }
    console.log(cookieArr);
    return cookieArr;
}
function deleteCookie(cookieName)
{
    var checked = hasCookie(cookieName);
    var now = new Date();
    now.setMonth(now.getMonth() - 1);
    if(checked == true)
    {
        setCookie(cookieName,"",now);
    }
    else
    {
        alert("This cookie is not found");
    }  
}

function display()
{
    
    location.replace("profilepage.html")  
}

function VisitCounter()
{
    setCookie("counter", (parseInt(getCookie("counter"))+1) , (12*31*24*60*60));
}

function setCookie(cName,cVal,cExpDate)
{
    var expiry="";
    if(cExpDate)
    {
        var today=new Date();
        today.setTime(today.getTime + (cExpDate*24*60*60*1000));
        expiry="; expires="+today.toUTCString();
    }
  document.cookie=cName+"="+(cVal||"")+expiry+"; path=/";
}