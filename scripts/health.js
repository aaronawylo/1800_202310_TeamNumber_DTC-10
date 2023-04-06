function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("healthCardTemplate");
  db.collection(collection)
    .get() 
    .then((allHealth) => {
      allHealth.forEach((doc) => {
        var title = doc.data().name;
        var paragraph = doc.data().paragraph; 
        var link = doc.data().url;
        let newcard = cardTemplate.content.cloneNode(true);
        newcard.querySelector(".card-title").innerHTML = title;
        newcard.querySelector(".card-text").innerHTML = paragraph;
        newcard.querySelector(".view-article-button").href = link;
        newcard
          .querySelector(".save-article-button")
          .addEventListener("click", function () {
            console.log("lulu: ", title);
          });
        document.getElementById(collection + "-go-here").appendChild(newcard);
      });
    });
}
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
displayCardsDynamically("health"); 