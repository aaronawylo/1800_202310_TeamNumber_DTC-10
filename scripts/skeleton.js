//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
    console.log($('#navbarPlaceholder').load('./text/nav.html', activateDropdown)); 
    console.log($('#footerPlaceholder').load('./text/footer.html'));
}
loadSkeleton();  //invoke the function

// Define a function to activate the dropdown menu
function activateDropdown() {
    // $('.dropdown-toggle').dropdown();
    $('.dropdown-item').click(function () {
        console.log($(this).text());
        window.location.href = "./articlelist.html?category=" + $(this).text().toLowerCase();
    });
}

activateDropdown();

// Define a function to add word from search bar to url
function activateSearch() {
    $(document).on('click', '#searchbutton', function () {
        console.log("Search button clicked");
        var searchword = $('#searchValue').val();
        console.log(searchword);
        window.location.href = "./articlelist.html?category=" + searchword;
    });
}

activateSearch();

    // $('.dropdown-toggle').dropdown();
//     $('.dropdown-item').click(function () {
//         console.log($(this).text());
//         window.location.href = "./articlelist.html?category=" + $(this).text().toLowerCase();
//     });
// }

// function to add event listener to menu items
// function addMenuListener(category) {
//     console.log(category);
//     document.getElementById("health").addEventListener("click", () => {
//         passValueURL(category);
//     })
// }

// function passValueURL(category) {
//     console.log("clicked ..." + category);
//     window.location.href = "./articlelist.html&category=" + category;
// }

// addMenuListener("health");