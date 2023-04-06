function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("financeCardTemplate");
    db.collection(collection).get()  
        .then(allFinance => {
            allFinance.forEach(doc => { 
                var title = doc.data().name;      
                var paragraph = doc.data().paragraph;  
                var website = doc.data().website
                let newcard = cardTemplate.content.cloneNode(true);
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = paragraph;
                newcard.querySelector('.view-article-button').href = website;
                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}
displayCardsDynamically("finance"); 