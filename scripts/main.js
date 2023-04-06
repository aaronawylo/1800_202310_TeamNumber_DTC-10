function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); 
            console.log(user.displayName); 
            currentUser = db.collection("users").doc(user.uid).get().then(
                userDoc => {
                    var user_Name = userDoc.data().name;
                    $("#name-goes-here").text(user_Name);              
                })
        } else {
        }
    });
}
getNameFromAuth();