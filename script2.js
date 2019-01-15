function checkUser(){
    if(auth.currentUser !== null){
        console.log("logged in");
        console.log(auth.currentUser.uid);
        return true;
    } else {
        console.log("not logged in");
        return false;
    }
}

function signIn(){
    $("#main").html("<input id='ingredient-input'>");
}

$(".color").on("click", function(){
    var value = $(this).attr("value");
    console.log(value);
    if(checkUser()){
        console.log("color picked");
    } else {
        console.log("color not");
    }
})