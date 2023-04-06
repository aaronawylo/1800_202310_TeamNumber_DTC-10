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
  displayCardsDynamically(category);
  console.log($('#summaryPlaceholder').load(`./text/${category}description.html`));
}
get_database_from_URL();
function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("articleCardTemplate");
  if (
    collection == "supplies" ||
    collection == "finance" ||
    collection == "health"
  ) {
    db.collection(collection)
      .get() 
      .then((allArticle) => {
        allArticle.forEach((doc) => {  
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
      });
  } else {
    db.collection("health").where("tags", "array-contains", collection)
      .get() 
      .then((allArticle) => {
        allArticle.forEach((doc) => {
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
      });
    db.collection("supplies").where("tags", "array-contains", collection)
      .get() 
      .then((allArticle) => {
        allArticle.forEach((doc) => {
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
      });
    db.collection("finance").where("tags", "array-contains", collection)
      .get() 
      .then((allArticle) => {
        allArticle.forEach((doc) => {
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