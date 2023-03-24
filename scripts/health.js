function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("healthCardTemplate");

  db.collection(collection)
    .get() //the collection called "hikes"
    .then((allHealth) => {
      //var i = 1;  //Optional: if you want to have a unique ID for each hike
      allHealth.forEach((doc) => {
        //iterate thru each doc
        var title = doc.data().name; // get value of the "name" key
        var paragraph = doc.data().paragraph; // get value of the "paragraph" key
        var link = doc.data().url;
        // var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
        // var website = doc.data().website; //gets the website field
        // var docID = doc.id;                //gets the document ID
        let newcard = cardTemplate.content.cloneNode(true);
        //update title and text and image
        newcard.querySelector(".card-title").innerHTML = title;
        // newcard.querySelector('.card-website').innerHTML = website
        newcard.querySelector(".card-text").innerHTML = paragraph;
        // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
        newcard.querySelector(".view-article-button").href = link;

        newcard
          .querySelector(".save-article-button")
          .addEventListener("click", function () {
            console.log("lulu: ", title);
            // var userId = firebase.auth().currentUser.uid;
            // let savedArticles = {
            //   savedArticles: ["test"],
            // };
            // db.collection("users")
            //   .doc(userId)
            //   .update(savedArticles)
            //   .then(() => {
            //     console.log("Document successfully written!");
            //   })
            //   .catch((error) => {
            //     console.error("Error writing document: ", error);
            //   });
          });
        //Optional: give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery, Example: "hikes-go-here"
        document.getElementById(collection + "-go-here").appendChild(newcard);
        //i++;   //Optional: iterate variable to serve as unique ID
      });
    });
}

// function to save data to user collection in firestore
// function saveDataToUserCollection(collection, data) {
//   let formattedData={
//     savedArticles: data
//   }
//   db.collection(collection)
//     .doc(user.uid)
//     .set(formattedData)
//     .then(() => {
//       console.log("Document successfully written!");
//     })
//     .catch((error) => {
//       console.error("Error writing document: ", error);
//     });
// }

document
  .getElementsByClassName("save-article-button")
  .click(function saveArticleToProfile(collection, data) {
    let formattedData = {
      savedArticles: data,
    };
    db.collection(collection)
      .doc(user.uid)
      .set(formattedData)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
//   let savedArticles = document.getElementById("users")
//   db.collection("users")
//     // .doc(user.uid)
//     .set({
//       formattedData: {
//         title: "title",
//         link: "link",
//         paragraph: "paragraph",
//         tags: ["health"],
//         rating: 5,
//       },
//     })
//     .then(() => {
//       console.log("Document successfully written!");
//     })
//     .catch((error) => {
//       console.error("Error writing document: ", error);
//     });
//     document.getElementById("users").appendChild(savedArticles);
// });
//   saveDataToUserCollection("users", {name: 'name', articleLink: 'link', paragraph: 'paragraph', tags: ['health'], rating: 5});
// });
function saveArticleToProfile(collection, data) {
  var user = authResult.user;
  let formattedData = {
    savedArticles: data,
  };
  db.collection(collection)
    .doc(user.uid)
    .set(formattedData)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

displayCardsDynamically("health"); //input param is the name of the collection

//function for adding collection to an uid
// function addCollectionToUser(collection, data) {
//   let formattedData = {
//     savedArticles: data,
//   };
//   db.collection(collection)
//     .doc(user.uid)
//     .set(formattedData)
//     .then(() => {
//       console.log("Document successfully written!");
//     })
//     .catch((error) => {
//       console.error("Error writing document: ", error);
//     });
// }
