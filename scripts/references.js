// Sort articles from three article collections and display the links in separate sections
function displayCardsDynamically() {
  let cardTemplate = document.getElementById("referenceTemplate");
  db.collection("health")
    .get()
    .then((allArticle) => {
      allArticle.forEach((doc) => {
        var website = doc.data().url;
        let newcard = cardTemplate.content.cloneNode(true);
        console.log(doc.data().tags);
        newcard.querySelector(".reference-link").href = website;
        newcard.querySelector(".reference-link").innerHTML = website
        document.getElementById("health-reference").appendChild(newcard)
      });
    });

  db.collection("supplies")
    .get()
    .then((allArticle) => {
      allArticle.forEach((doc) => {
        var website = doc.data().url;
        let newcard = cardTemplate.content.cloneNode(true);
        console.log(doc.data().tags);
        newcard.querySelector(".reference-link").href = website;
        newcard.querySelector(".reference-link").innerHTML = website
        document.getElementById("supplies-reference").appendChild(newcard)
      });
    });

  db.collection("finance")
    .get()
    .then((allArticle) => {
      allArticle.forEach((doc) => {
        var website = doc.data().url;
        let newcard = cardTemplate.content.cloneNode(true);
        console.log(doc.data().tags);
        newcard.querySelector(".reference-link").href = website;
        newcard.querySelector(".reference-link").innerHTML = website
        document.getElementById("finance-reference").appendChild(newcard)
      });
    });
}


displayCardsDynamically()