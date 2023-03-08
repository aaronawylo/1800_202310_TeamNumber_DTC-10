var currentUser;          //put this right after you start script tag before writing any functions.

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userPhone = userDoc.data().phone;
                    var userMobile = userDoc.data().mobile;
                    var userAddress = userDoc.data().address;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }

                    if (userEmail != null) {
                        document.getElementById("useremail").innerText = userEmail;
                    }
                    
                    if (userPhone != null) {
                        document.getElementById("phoneInput").value = userSchool;
                    }
                    
                    if (userMobile != null) {
                        document.getElementById("mobileInput").value = userSchool;
                    }
                    
                    if (userAddress != null) {
                        document.getElementById("addressInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }


function saveUserInfo(){
    console.log("inside")

    var userName = document.getElementById("nameInput").value;

    var userPhone = document.getElementById("phoneInput").value;

    var userMobile = document.getElementById("mobileInput").value;

    var userAddress = document.getElementById("addressInput").value;  

    currentUser.update({
        name: userName,
        phone: userPhone,
        mobile: userMobile,
        address: userAddress,
    })
    .then(() => {
        console.log("Document successfully updated!");
    })

    document.getElementById('personalInfoFields').disabled = true;
}