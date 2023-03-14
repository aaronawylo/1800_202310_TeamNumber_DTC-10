var collection = localStorage.getItem("category")
console.log(collection)

const urlParams = new URLSearchParams(window.location.search);
var ID = urlParams.get('docID');
console.log(ID);

function getArticleName(id) {
    db.collection("supplies")
        .doc(id)
        .get()
        .then((thisArticle) => {
            var articleName = thisArticle.data().name;
            document.getElementById("article-title").innerHTML = articleName;
        });

    db.collection("finance")
        .doc(id)
        .get()
        .then((thisArticle) => {
            var articleName = thisArticle.data().name;
            document.getElementById("article-title").innerHTML = articleName;
        });

    db.collection("health")
        .doc(id)
        .get()
        .then((thisArticle) => {
            var articleName = thisArticle.data().name;
            document.getElementById("article-title").innerHTML = articleName;
        });

}
getArticleName(ID);

