 
var arr = [];

$('#loginF').submit(function() {
    var noOfUsers = parseInt(getCookie("count"));
    var str="user";
    console.log(noOfUsers);
    for(var i = 1; i<=noOfUsers; i++){
        var user = getCookie(str+i);
        arr.push(JSON.parse(user));
    }
    var flag = 0;
    for(var i =0; i<arr.length; i++){
        console.log(arr[i]["Email"]);
        if(arr[i]["Email"]==$("#tname").val()){
            flag=1;
            if(arr[i]["Password"]==$("#pass").val()){
                setCookie("currentUser", JSON.stringify(arr[i]))
                return true;
            }
            else {
               
                $("#dialogpassword").dialog();
                return false;
                 }
        }
              
    }
    if(flag==0){
       
       $("#dialogemail").dialog();
        return false;
    }
})