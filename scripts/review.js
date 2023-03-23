var collection = localStorage.getItem("category")
console.log(collection)

const urlParams = new URLSearchParams(window.location.search);
var ID = urlParams.get('docID');
console.log(ID);

function getArticleName(id) {
    db.collection("supplies")
        .doc(id)
        .get()
        .then((thisArticle) => {
            var articleName = thisArticle.data().name;
            document.getElementById("article-title").innerHTML = articleName;
        });

    db.collection("finance")
        .doc(id)
        .get()
        .then((thisArticle) => {
            var articleName = thisArticle.data().name;
            document.getElementById("article-title").innerHTML = articleName;
        });

    db.collection("health")
        .doc(id)
        .get()
        .then((thisArticle) => {
            var articleName = thisArticle.data().name;
            document.getElementById("article-title").innerHTML = articleName;
        });

}
getArticleName(ID);

function writeReview() {
    console.log("inside write review")
    let Level = document.getElementById("level").value;
    let Description = document.getElementById("description").value;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("reviews").add({
                        ArticleDocID: ID,
                        userID: userID,
                        level: Level,
                        description: Description,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "review.html?docID=" + ID; //new line added
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'login.html';
        }
    });
}

function populateReviews() {
    let ArticleCardTemplate = document.getElementById("reviewCardTemplate");
    let ArticleCardGroup = document.getElementById("reviewCardGroup");

    //let params = new URL(window.location.href) //get the url from the searbar
    //let hikeID = params.searchParams.get("docID");
    db.collection("reviews").where( "ArticleDocID", "==", ID).get()
        .then(allReviews => {
            reviews=allReviews.docs;
            console.log(reviews);
            reviews.forEach(doc => {
                var level = doc.data().level; //gets the unique ID field
                var description = doc.data().description; 
                var time = doc.data().timestamp.toDate();
                console.log(level, description, time)

                let reviewCard = ArticleCardTemplate.content.cloneNode(true);
                reviewCard.querySelector('.time').innerHTML = time    
                reviewCard.querySelector('.rating').innerHTML = level
                reviewCard.querySelector('.description').innerHTML = description
                ArticleCardGroup.appendChild(reviewCard);
            })
        })
}
populateReviews();