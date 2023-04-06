function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("suppliesCardTemplate");
    db.collection(collection).get()  
        .then(allSupplies=> {
            allSupplies.forEach(doc => { 
                var title = doc.data().name;   
                var details = doc.data().paragraph; 
                var website = doc.data().url 
                let newcard = cardTemplate.content.cloneNode(true);
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.view-article-button').href = website;
                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}
displayCardsDynamically("supplies"); 