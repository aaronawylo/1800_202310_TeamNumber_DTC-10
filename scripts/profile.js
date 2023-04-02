var currentUser;          //put this right after you start script tag before writing any functions.

function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            getBookmarks(user)
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();
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
                        document.getElementById("phoneInput").value = userPhone;
                    }

                    if (userMobile != null) {
                        document.getElementById("mobileInput").value = userMobile;
                    }

                    if (userAddress != null) {
                        document.getElementById("addressInput").value = userAddress;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
    document.getElementById('save-button').disabled = false;
    document.getElementById('edit-button').disabled = true;
}


function saveUserInfo() {
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
    document.getElementById('save-button').disabled = true;
    document.getElementById('edit-button').disabled = false;
}
function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {

            // Get the Array of bookmarks
            var bookmarks = userDoc.data().savedArticles;
            console.log(bookmarks);

            // Get pointer the new card template
            let newcardTemplate = document.getElementById("cardTemplate");

            // Iterate through the ARRAY of bookmarked hikes (document ID's)
            bookmarks.forEach(allArticle => {
                console.log(allArticle);
                db.collection("health").doc(allArticle).get().then(doc => {
                    var title = doc.data().name; // get value of the "name" key
                    var paragraph = doc.data().paragraph; //get unique ID to each hike to be used for fetching right image
                    var tags = doc.data().tags; //gets the length field
                    var url = doc.data().url;  //this is the autogenerated ID of the document
                    var docID = doc.id
                    //clone the new card
                    let newcard = newcardTemplate.content.cloneNode(true);

                    //update title and some pertinant information
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-text').innerHTML = paragraph;
                    // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
                    newcard.querySelector(".view-article-button").href = url;
                    newcard.querySelector(".review-article-button").href =
                        "review.html?docID=" + docID;
                    newcard.querySelector(".remove-button").onclick = () =>
                        removeArticle(doc.id);

                    //NEW LINE: update to display length, duration, last updated
                    // newcard.querySelector('.card-length').innerHTML =
                    //     "Length: " + doc.data().length + " km <br>" +
                    //     "Duration: " + doc.data().hike_time + "min <br>" +
                    //     "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

                    //Finally, attach this new card to the gallery
                    articleCardGroup.appendChild(newcard);
                })
                db.collection("supplies").doc(allArticle).get().then(doc => {
                    var title = doc.data().name; // get value of the "name" key
                    var paragraph = doc.data().paragraph; //get unique ID to each hike to be used for fetching right image
                    var tags = doc.data().tags; //gets the length field
                    var url = doc.data().url;  //this is the autogenerated ID of the document
                    var docID = doc.id
                    //clone the new card
                    let newcard = newcardTemplate.content.cloneNode(true);

                    //update title and some pertinant information
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-text').innerHTML = paragraph;
                    // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
                    newcard.querySelector(".view-article-button").href = url;
                    newcard.querySelector(".review-article-button").href =
                        "review.html?docID=" + docID;
                    newcard.querySelector(".remove-button").onclick = () =>
                        removeArticle(doc.id);

                    //NEW LINE: update to display length, duration, last updated
                    // newcard.querySelector('.card-length').innerHTML =
                    //     "Length: " + doc.data().length + " km <br>" +
                    //     "Duration: " + doc.data().hike_time + "min <br>" +
                    //     "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

                    //Finally, attach this new card to the gallery
                    articleCardGroup.appendChild(newcard);
                })
                db.collection("finance").doc(allArticle).get().then(doc => {
                    var title = doc.data().name; // get value of the "name" key
                    var paragraph = doc.data().paragraph; //get unique ID to each hike to be used for fetching right image
                    var tags = doc.data().tags; //gets the length field
                    var url = doc.data().url;  //this is the autogenerated ID of the document
                    var docID = doc.id
                    //clone the new card
                    let newcard = newcardTemplate.content.cloneNode(true);

                    //update title and some pertinant information
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-text').innerHTML = paragraph;
                    // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
                    newcard.querySelector(".view-article-button").href = url;
                    newcard.querySelector(".review-article-button").href =
                        "review.html?docID=" + docID;
                    newcard.querySelector(".remove-button").onclick = () =>
                        removeArticle(doc.id);

                    //NEW LINE: update to display length, duration, last updated
                    // newcard.querySelector('.card-length').innerHTML =
                    //     "Length: " + doc.data().length + " km <br>" +
                    //     "Duration: " + doc.data().hike_time + "min <br>" +
                    //     "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

                    //Finally, attach this new card to the gallery
                    articleCardGroup.appendChild(newcard);
                })
            });
        })
}


function removeArticle(title) {
    console.log("lulu: ", title);
    var userId = firebase.auth().currentUser.uid;


    db.collection("users")
        .doc(userId)
        .update({ savedArticles: firebase.firestore.FieldValue.arrayRemove(title) }, { merge: true })
        .then(() => {
            console.log("Document successfully written!");
            window.location.href = "profile.html"; //new line added
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        })



}

