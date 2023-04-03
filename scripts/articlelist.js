var currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var currentUser = db.collection("users").doc(user.uid); //global
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
      .get() //the collection
      .then((allArticle) => {
        allArticle.forEach((doc) => {
          //iterate thru each doc
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

          //i++;   //Optional: iterate variable to serve as unique ID
        });
      });
  } else {
    db.collection("health").where("tags", "array-contains", collection)
      .get() //the collection
      .then((allArticle) => {
        allArticle.forEach((doc) => {
          //iterate thru each doc

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

            //i++;   //Optional: iterate variable to serve as unique ID
          })
        });
      });


    db.collection("supplies").where("tags", "array-contains", collection)
      .get() //the collection
      .then((allArticle) => {
        allArticle.forEach((doc) => {
          //iterate thru each doc


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

          //i++;   //Optional: iterate variable to serve as unique ID

        });
      });

    db.collection("finance").where("tags", "array-contains", collection)
      .get() //the collection
      .then((allArticle) => {
        allArticle.forEach((doc) => {
          //iterate thru each doc


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

          //Optional: give unique ids to all elements for future use
          // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
          // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
          // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

          //attach to gallery, Example: "hikes-go-here"
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

