async function get_database_from_URL() {
    console.log("Calling function")
    const urlParams = new URLSearchParams(window.location.search);
    var searchValue = urlParams.get('results');
    console.log(searchValue);
    localStorage.setItem("results", searchValue);

    const listofwords = ["finance", "health", "supplies", "heat", "fire", "cold", "earthquake", "flood", "thunderstorm", "wind"]
    console.log("Just before collection population")
    if (listofwords.includes(searchValue.toLowerCase())) {
        // An array of collection references.
        const collectionRefs = ['finance', 'health', 'supplies'];

        // A placeholder for search results.
        const cardTemplate = document.getElementById("articleCardTemplate");

        // // Clear the previous search results from the placeholder.
        // searchResults.innerHTML = '';

        // Loop through all collections and search for the specific tag.
        for (const collection of collectionRefs) {

            // Query the collection for documents that contain the searched tag.
            var querySnapshot = await db.collection(collection).where("tags", "array-contains", searchValue).get();

            // Loop through each document in the query results and populate the search results placeholder.
            querySnapshot.forEach(doc => {
                var title = doc.data().name; // get value of the "name" key
                var paragraph = doc.data().paragraph; // get value of the "paragraph" key
                var website = doc.data().url;
                var docID = doc.id; //gets the document ID
                let newcard = cardTemplate.content.cloneNode(true);
                console.log(doc.data().tags);
                //update title and text and image
                newcard.querySelector(".card-title").innerHTML = title;
                // newcard.querySelector('.card-website').innerHTML = website
                newcard.querySelector(".card-text").innerHTML = paragraph;
                // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector(".view-article-button").href = website;

                newcard.querySelector(".review-article-button").href =
                    "review.html?docID=" + docID;

                newcard.querySelector("i").id = "save-" + docID;
                newcard.querySelector("i").onclick = () =>
                    saveArticleToProfile(docID);



                document.getElementById("article-go-here").appendChild(newcard);

                var userId = firebase.auth().currentUser.uid;
                db.collection("users").doc(userId).get().then((doc) => {

                    if (doc.data().savedArticles.includes(docID)) {
                        document.getElementById('save-' + docID).innerHTML = 'bookmark';
                    }

                })

            });
        }
    }
    else { return false; }
}

get_database_from_URL();

function saveArticleToProfile(title) {
    console.log("lulu: ", title);
    var userId = firebase.auth().currentUser.uid;
  
    db.collection("users").doc(userId).get().then((doc) => {
  
      if (doc.data().savedArticles.includes(title)) {
        db.collection("users")
          .doc(userId)
          .update({ savedArticles: firebase.firestore.FieldValue.arrayRemove(title) }, { merge: true })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        document.getElementById("save-" + title).innerHTML = "bookmark_border"
      }
  
      else {
        db.collection("users")
          .doc(userId)
          .update({ savedArticles: firebase.firestore.FieldValue.arrayUnion(title) }, { merge: true })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          })
        document.getElementById("save-" + title).innerHTML = "bookmark"
      }
    }
    )
  }
  
  