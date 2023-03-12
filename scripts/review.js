var collection = localStorage.getItem("category")
console.log(collection)

const urlParams = new URLSearchParams(window.location.search);
    var ID = urlParams.get('docID');
    console.log(ID);

function getArticleName(id) {
    db.collection(collection)
        .doc(id)
        .get()
        .then((thisArticle) => {
            var articleName = thisArticle.data().name;
            document.getElementById("article-title").innerHTML = articleName;
        });}

getArticleName(ID);

