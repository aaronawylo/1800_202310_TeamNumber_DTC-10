var currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var currentUser = db.collection("users").doc(user.uid);
    console.log(currentUser);
  }
});
function get_database_from_URL() {
  console.log("Calling function")
  const urlParams = new URLSearchParams(window.location.search);
  var category = urlParams.get('category');
  console.log(category);
  localStorage.setItem("category", category);
  displayCardsDynamically();
  console.log($('#summaryPlaceholder').load(`./text/${category}description.html`));
}
get_database_from_URL();
async function displayCardsDynamically() {
  console.log("Calling function")
  const urlParams = new URLSearchParams(window.location.search);
  var searchValue = urlParams.get('category');
  console.log(searchValue);
  console.log("Just before collection population")
  const collectionRefs = ['finance', 'health', 'supplies'];
  const cardTemplate = document.getElementById("articleCardTemplate");
  for (const collection of collectionRefs) {
    var querySnapshot = await db.collection(collection).where("tags", "array-contains", searchValue).get();
    querySnapshot.forEach(doc => {
      var title = doc.data().name;
      var paragraph = doc.data().paragraph;
      var website = doc.data().url;
      var docID = doc.id;
      let newcard = cardTemplate.content.cloneNode(true);
      console.log(doc.data().tags);
      newcard.querySelector(".card-title").innerHTML = title;
      newcard.querySelector(".card-text").innerHTML = paragraph;
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