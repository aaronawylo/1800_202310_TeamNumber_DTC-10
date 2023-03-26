function displayCardsDynamically() {
    let cardTemplate = document.getElementById("referenceTemplate");
      db.collection("health")
        .get() //the collection
        .then((allArticle) => {
          allArticle.forEach((doc) => {
            //iterate thru each doc
            var website = doc.data().url;
            let newcard = cardTemplate.content.cloneNode(true);
            console.log(doc.data().tags);
            newcard.querySelector(".reference-link").href = website;
            newcard.querySelector(".reference-link").innerHTML = website
            // document.getElementById("supplies-references").appendChild(newcard);
            document.getElementById("health-reference").appendChild(newcard)
            //i++;   //Optional: iterate variable to serve as unique ID
          });
        });
        db.collection("supplies")
        .get() //the collection
        .then((allArticle) => {
          allArticle.forEach((doc) => {
            //iterate thru each doc
            var website = doc.data().url;
            let newcard = cardTemplate.content.cloneNode(true);
            console.log(doc.data().tags);
            newcard.querySelector(".reference-link").href = website;
            newcard.querySelector(".reference-link").innerHTML = website
            // document.getElementById("supplies-references").appendChild(newcard);
            document.getElementById("supplies-reference").appendChild(newcard)
            //i++;   //Optional: iterate variable to serve as unique ID
          });
        });
        db.collection("finance")
        .get() //the collection
        .then((allArticle) => {
          allArticle.forEach((doc) => {
            //iterate thru each doc
            var website = doc.data().url;
            let newcard = cardTemplate.content.cloneNode(true);
            console.log(doc.data().tags);
            newcard.querySelector(".reference-link").href = website;
            newcard.querySelector(".reference-link").innerHTML = website
            // document.getElementById("supplies-references").appendChild(newcard);
            document.getElementById("finance-reference").appendChild(newcard)
            //i++;   //Optional: iterate variable to serve as unique ID
          });
        });
    
    }

    displayCardsDynamically()