function loadSkeleton() {
    console.log($('#navbarPlaceholder').load('./text/nav.html', activateDropdown)); 
    console.log($('#footerPlaceholder').load('./text/footer.html'));
}


loadSkeleton();  


function activateDropdown() {
    $('.dropdown-item').click(function () {
        console.log($(this).text());
        window.location.href = "./articlelist.html?category=" + $(this).text().toLowerCase();
    });
}


activateDropdown();


// redirect to appropriate search page after clicking search button
function buttonforSearch() {
    $(document).on('click', '#searchbutton', function () {
        console.log("Search button clicked");
        var searchword = $('#searchValue').val();
        const listofwords = ["finance", "health", "supplies", "heat", "fire", "cold", "earthquake", "flood", "thunderstorm", "wind"]
        if (listofwords.includes(searchword.toLowerCase())) {
            console.log(searchword.toLowerCase());
            window.location.href = "./search.html?results=" + searchword.toLowerCase();
        }
        else {
            return false;
        }
    });
}


buttonforSearch();

// redirect to appropriate search page after pressing enter
function onSubmit() {
    $(document).on('submit', '#searchForm', function () {
            console.log("Search submitted");
            var searchword = $('#searchValue').val();
            const listofwords = ["finance", "health", "supplies", "heat", "fire", "cold", "earthquake", "flood", "thunderstorm", "wind"]
            if (listofwords.includes(searchword.toLowerCase())) {
                console.log(searchword.toLowerCase());
                window.location.href = "./search.html?results=" + searchword.toLowerCase();
            }
            else {
                return false;
            }
        }
    );
}
onSubmit();