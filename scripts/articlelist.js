function get_database_from_URL() {
    console.log("Calling function")
    const urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('category');
    console.log(category);
    displayCardsDynamically(category);
}

get_database_from_URL();

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("articleCardTemplate");

    db.collection(collection).get()   //the collection
        .then(allArticle => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allArticle.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var paragraph = doc.data().paragraph;  // get value of the "paragraph" key
                var website = doc.data().url
                // var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                // var website = doc.data().website; //gets the website field
                // var docID = doc.id;                //gets the document ID
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                // newcard.querySelector('.card-website').innerHTML = website
                newcard.querySelector('.card-text').innerHTML = paragraph;
                // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('.view-article-button').href = website;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById("article-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

  //input param is the name of the collection