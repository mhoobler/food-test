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
    var user = auth.currentUser.uid;
    var updates = {};

    console.log(value);
    if(checkUser()){
        return firebase.database().ref('/users/' + user).once('value').then(function(snapshot) {
        //var array = snapshot.val().testArray;
        var past_array = snapshot.val().testArray;
        var counter = 0;
        //check if array has any values
        if(past_array == null){
            var new_array = [value];
            updates["/users/" + user + "/testArray"] = new_array;
            return db.ref().update(updates);
        } else {
            //check if user input value is == some value in array saved on database
            for(var i=0; i < past_array.length; i++){
                if(value != past_array[i]){
                    counter += 1;
                }
                if(counter == past_array.length){
                    past_array.push(value);
                    updates["/users/" + user + "/testArray"] = past_array;
                    return db.ref().update(updates);
                }
            }
        }
        });
    } else {
        console.log("color not");
    }
})

$("#update-user").on("click", function(){
    var user = auth.currentUser.uid;
    var userData = {
        email: "t@t.com",
        joinDate: "12-12-12",
        testArray: {}
    }

    var updates = {};
    updates["/users/" + user + "/testArray"] = userData.testArray;

    return db.ref().update(updates);
})

$("#test-btn").on("click", function(){
    var userId = auth.currentUser.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var array = snapshot.val().testArray;
    console.log(array);
    });
})

$("#recipe-btn").on("click", function(){
    var userId = auth.currentUser.uid;
    var APIKey = "f2c7f03ce6caef2a5f775dc746cdf6d9";
    var currentDish;

    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    currentDish = snapshot.val().testArray;
    console.log(currentDish);
    }).then(function(){ 
        console.log(currentDish);
        var queryURL = "https://www.food2fork.com/api/search?key=" + APIKey + "&q=" + currentDish + "&page=1";
    
        $("#gif-view").empty();
    
        $.ajax({
            url: queryURL,
            method: "GET"}).then(function(response){
                console.log({ response: response });       
        //Insert three dish pics with title   
            for (var k=0; k < 3; k++){
    
                var usableResponse = JSON.parse(response);
                console.log(usableResponse);
                
                var dishTitle = $("<div>").text(usableResponse.recipes[k].title);
                $("#gif-view").append(dishTitle);
    
                var nextDish = $("<img>").attr('src', usableResponse.recipes[k].image_url);
                $("#gif-view").append(nextDish);
            };
        }); })
    
})




//NEEDS FIX, need to filter array for empties for users to remove things from their ingredients list
// function filterArray(test_array) {
//     var index = -1,
//         arr_length = test_array ? test_array.length : 0,
//         resIndex = -1,
//         result = [];

//     while (++index < arr_length) {
//         var value = test_array[index];

//         if (value) {
//             result[++resIndex] = value;
//         }
//     }

//     console.log(result);
//     return result;}