var currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid); //global
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

          // newcard.querySelector(".save-article-button").onclick = () =>
          //   saveArticleToProfile(title);

          //Optional: give unique ids to all elements for future use
          // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
          // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
          // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

          //attach to gallery, Example: "hikes-go-here"
          // newcard.querySelector("button").id = "save-" + docID;
          // this line will call a function to save the hikes to the user's document
          // newcard.querySelector("button").onclick = () => updateBookmark(docID);
          // currentUser.get().then((userDoc) => {
          //   //get the user name
          //   var bookmarks = userDoc.data().bookmarks;
          //   if (bookmarks.includes(docID)) {
          //     document.getElementById("save-" + docID).innerText = "Profile";
          //   }
          // });

          document.getElementById("article-go-here").appendChild(newcard);

          //i++;   //Optional: iterate variable to serve as unique ID
        });
      });
  } else {
    db.collection("health")
      .get() //the collection
      .then((allArticle) => {
        allArticle.forEach((doc) => {
          //iterate thru each doc

          if (doc.data().tags.includes(collection)) {
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

            // newcard.querySelector(".save-article-button").href =
            //   saveArticleToProfile(title);

            // var saveBtn = document.querySelector(".save-article-button");
            // saveBtn.addEventListener("click", function () {
            //   console.log("button works now");
            // });

            // new stuff start
            // newcard.querySelector(".save-article-button").onclick = () =>
            //   console.log("hi");

            // new stuff end

            newcard.querySelector(".review-article-button").href =
              "review.html?docID=" + docID;

            newcard.querySelector("i").id = "save-" + docID;
            newcard.querySelector("i").onclick = () =>
              saveArticleToProfile(docID);

            // newcard
            //   .querySelector(".save-article-button")
            //   .addEventListener("click", function () {
            //     console.log("lulu: ");
            //     var userId = firebase.auth().currentUser.uid;
            //     let savedArticles = {
            //       savedArticles: ["test"],
            //     };
            //     db.collection("users")
            //       .doc(userId)
            //       .update(savedArticles)
            //       .then(() => {
            //         console.log("Document successfully written!");
            //       })
            //       .catch((error) => {
            //         console.error("Error writing document: ", error);
            //       });
            //   });

            //Optional: give unique ids to all elements for future use
            // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
            // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
            // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

            //attach to gallery, Example: "hikes-go-here"
            document.getElementById("article-go-here").appendChild(newcard);

            //i++;   //Optional: iterate variable to serve as unique ID
          }
        });
      });

    db.collection("supplies")
      .get() //the collection
      .then((allArticle) => {
        allArticle.forEach((doc) => {
          //iterate thru each doc

          if (doc.data().tags.includes(collection)) {
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

            //i++;   //Optional: iterate variable to serve as unique ID
          }
        });
      });

    db.collection("finance")
      .get() //the collection
      .then((allArticle) => {
        allArticle.forEach((doc) => {
          //iterate thru each doc

          if (doc.data().tag.includes(collection)) {
            var title = doc.data().name; // get value of the "name" key
            var paragraph = doc.data().paragraph; // get value of the "paragraph" key
            var website = doc.data().url;
            var docID = doc.id; //gets the document ID
            let newcard = cardTemplate.content.cloneNode(true);
            console.log(doc.data().tag);
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

            // newcard
            //   .querySelector(".save-article-button")
            //   .addEventListener("click", function () {
            //     console.log("lulu: ", title);
            //     // var userId = firebase.auth().currentUser.uid;
            //     // let savedArticles = {
            //     //   savedArticles: ["test"],
            //     // };
            //     // db.collection("users")
            //     //   .doc(userId)
            //     //   .update(savedArticles)
            //     //   .then(() => {
            //     //     console.log("Document successfully written!");
            //     //   })
            //     //   .catch((error) => {
            //     //     console.error("Error writing document: ", error);
            //     //   });
            //   });

            //i++;   //Optional: iterate variable to serve as unique ID
          }
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
    }
  }
  )
}

//input param is the name of the collection

// newcard.querySelector("button").id = "save-" + docID;
// this line will call a function to save the hikes to the user's document
// newcard.querySelector("button").onclick = () => updateBookmark(docID);
// currentUser.get().then((userDoc) => {
//   //get the user name
//   var bookmarks = userDoc.data().bookmarks;
//   if (bookmarks.includes(docID)) {
//     document.getElementById("save-" + docID).innerText = "Profile";
//   }
// });
function updateBookmark(id) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //global
      console.log(currentUser);
    }
  });
  currentUser.get().then((userDoc) => {
    bookmarksNow = userDoc.data().bookmarks;
    console.log(bookmarksNow);

    //check if this bookmark already existed in firestore:
    if (bookmarksNow.includes(id)) {
      console.log(id);
      //if it does exist, then remove it
      currentUser
        .update({
          bookmarks: firebase.firestore.FieldValue.arrayRemove(id),
        })
        .then(function () {
          console.log("This article is removed for" + currentUser);
          var iconID = "save-" + id;
          console.log(iconID);
          document.getElementById(iconID).innerText = "Save";
        });
    } else {
      //if it does not exist, then add it
      currentUser
        .set(
          {
            bookmarks: firebase.firestore.FieldValue.arrayUnion(id),
          },
          {
            merge: true,
          }
        )
        .then(function () {
          console.log("This aticle is for" + currentUser);
          var iconID = "save-" + id;
          console.log(iconID);
          document.getElementById(iconID).innerText = "Save";
        });
    }
  });
}
