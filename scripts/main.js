function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            currentUser = db.collection("users").doc(user.uid).get().then(
                userDoc => {
                    //get the data fields of the user
                    var user_Name = userDoc.data().name;
                    $("#name-goes-here").text(user_Name);
                
                })
            


            //method #1:  insert with JS
            // document.getElementById("name-goes-here").innerText = user_Name;    
            //method #2:  insert using jquery
             //using jquery
            //method #3:  insert using querySelector
            // document.querySelector("#name-goes-here").innerText = user_Name

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function
