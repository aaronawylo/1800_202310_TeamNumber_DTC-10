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
function buttonforSearch() {
    $(document).on('click', '#searchbutton', function () {
        console.log("Search button clicked");
        var searchword = $('#searchValue').val();
        const listofwords = ["finance", "health", "supplies", "heat", "fire", "cold", "earthquake", "flood", "thunderstorm", "wind"]
        if (listofwords.includes(searchword.toLowerCase())) {
            console.log(searchword.toLowerCase());
            window.location.href = "./articlelist.html?category=" + searchword.toLowerCase();
        }
        else {
            return false;
        }
    });
}

buttonforSearch();

function onSubmit() {
    $(document).on('submit', '#searchForm', function () {
            console.log("Search submitted");
            var searchword = $('#searchValue').val();
            const listofwords = ["finance", "health", "supplies", "heat", "fire", "cold", "earthquake", "flood", "thunderstorm", "wind"]
            // if searchword is not in listofwords, return false
            if (listofwords.includes(searchword.toLowerCase())) {
                console.log(searchword.toLowerCase());
                window.location.href = "./articlelist.html?category=" + searchword.toLowerCase();
            }
            else {
                return false;
            }
        }
    );
}


onSubmit();