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
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userPhone = userDoc.data().phone;
                    var userMobile = userDoc.data().mobile;
                    var userAddress = userDoc.data().address;
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
            console.log("No user is signed in");
        }
    });
}
populateUserInfo();
function editUserInfo() {
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
            var bookmarks = userDoc.data().savedArticles;
            console.log(bookmarks);
            let newcardTemplate = document.getElementById("cardTemplate");
            bookmarks.forEach(allArticle => {
                console.log(allArticle);
                db.collection("health").doc(allArticle).get().then(doc => {
                    var title = doc.data().name; 
                    var paragraph = doc.data().paragraph; 
                    var tags = doc.data().tags;
                    var url = doc.data().url; 
                    var docID = doc.id
                    let newcard = newcardTemplate.content.cloneNode(true);
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-text').innerHTML = paragraph;
                    newcard.querySelector(".view-article-button").href = url;
                    newcard.querySelector(".review-article-button").href =
                        "review.html?docID=" + docID;
                    newcard.querySelector(".remove-button").onclick = () =>
                        removeArticle(doc.id);
                    articleCardGroup.appendChild(newcard);
                })
                db.collection("supplies").doc(allArticle).get().then(doc => {
                    var title = doc.data().name; 
                    var paragraph = doc.data().paragraph; 
                    var tags = doc.data().tags; 
                    var url = doc.data().url;  
                    var docID = doc.id
                    let newcard = newcardTemplate.content.cloneNode(true);
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-text').innerHTML = paragraph;
                    newcard.querySelector(".view-article-button").href = url;
                    newcard.querySelector(".review-article-button").href =
                        "review.html?docID=" + docID;
                    newcard.querySelector(".remove-button").onclick = () =>
                        removeArticle(doc.id);
                    articleCardGroup.appendChild(newcard);
                })
                db.collection("finance").doc(allArticle).get().then(doc => {
                    var title = doc.data().name; 
                    var paragraph = doc.data().paragraph; 
                    var tags = doc.data().tags; 
                    var url = doc.data().url; 
                    var docID = doc.id
                    let newcard = newcardTemplate.content.cloneNode(true);
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-text').innerHTML = paragraph;
                    newcard.querySelector(".view-article-button").href = url;
                    newcard.querySelector(".review-article-button").href =
                        "review.html?docID=" + docID;
                    newcard.querySelector(".remove-button").onclick = () =>
                        removeArticle(doc.id);
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
            window.location.href = "profile.html"; 
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        })
}

