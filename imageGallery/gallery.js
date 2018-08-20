$(document).ready(function () {
    var searchValue = "rice"
    var defaultPage = 1;
    
    // fixedTop();
    smoothScrolling();
    closeNavOnClick();
    searchSubmit(searchValue,defaultPage);
    returnPhotos(searchValue, defaultPage);
    // console.log(searchValue);

});

/*
1. Return Photos from pixabey API
*/
function returnPhotos(searchValue, pageNum) {
    let key = "8712269-5b0ee0617ceeb0fd2f84487c3";
    let startURL = "https://pixabay.com/api/?key=" + key;
    let page = "&page=" + pageNum;
    let imagesPerPage = "&per_page=" + 22
    let addWH = "&min_width&min_height";
    let safeSearch = "&safesearch=true";
    let endingURL = "&q=" + searchValue + page + addWH + safeSearch + imagesPerPage;

    // activate api and get data
    $.getJSON(startURL + endingURL, function (data) {
        let image = data.hits;
        // var imageLength = image.length;
        arrayLength = image.length;

        if (arrayLength >=1) {
            let output = ""
            for (let x = 0; x < arrayLength; x++) {

                //imageObject contains information on each image passed through the array
                let imageObject = {
                    // id: image[x].id,
                    // pageURL: image[x].pageURL,
                    // tags: image[x].tags,
                    // previewURL: image[x].previewURL,
                    // previewWidth: image[x].previewWidth,
                    // previewHeight: image[x].previewHeight,
                    webformatURL: image[x].webformatURL,
                    // webformatWidth: image[x].webformatWidth,
                    // webformatHeight: image[x].webformatHeight,
                    largeImageURL: image[x].largeImageURL,
                    // fullHDURL: image[x].fullHDURL,
                    // views: image[x].views,
                    // user_id: image[x].user_id,
                    // user: image[x].user,
                    // userImageURL: image[x].userImageURL
                }

                // output this template to the website
                output += `
                    <div class="brick animated fadeIn">
                        <a href="${imageObject.largeImageURL}">
                            <img src="${imageObject.webformatURL}">
                        </a>
                    </div>
                `
            }

            let img = $("#image-container");
            img.addClass("masonry");
            $("footer").css("margin-top", 40);
            img.html(output);
            // console.log("success");
        } else {
            let output2 = `
            <div class="col-md-12 animated fadeIn">
                <h1>404 sorry can't find any images</h1>
            </div>
        `
        $(".masonry").html(output2);
        $(".masonry").removeClass("masonry");
        $("#image-container").addClass("center");
        $("footer").css("margin-top", 88);
            // console.log("Didn't work");
        }
        getPage(searchValue, pageNum, arrayLength);
        console.log("This is the arraylength: " + arrayLength);
    });
}

/*
2. Search Boxes on Submit: Return Photos
*/
function searchSubmit(searchValue,defaultPage){
    $("#searchForm, #searchForm-nav").on("submit", function (event) {
        //obtain value from user input
        searchValue = $("#searchText").val();
        $("#searchText").val("");
        if (!searchValue) {
            searchValue = $("#searchText-nav").val();
            $("#searchText-nav").val("");
        }

        $(".pageNumber").html("Page " + 1);
        returnPhotos(searchValue, defaultPage);

        //closes navbar on submit and link click
        $(".navbar-collapse").collapse('hide');
        $('html, body').animate({
            scrollTop: $("#top")
        });
        //stops form from submitting to a file & resets value
        event.preventDefault();
    });
}


/*
3. INCREASE/Decrease PAGE NUMBER
*/
function getPage(searchValue, defaultPage, max) {
    if (defaultPage <= max + 1) {
        $("#pagination2").off("click").on("click", function () {
            if (defaultPage <= max) {
                let end = max + 1;
                defaultPage++;
                returnPhotos(searchValue, defaultPage);
                // $(".pageNumber").html("Page " + defaultPage + " of " + end);
                $(".pageNumber").html("Page " + defaultPage);
                // console.log("This is the default page:", defaultPage);
            };
        });

    }

    $("#pagination1").off("click").on("click", function () {
        if (defaultPage != 1) {
            let end = max + 1;
            defaultPage--;
            returnPhotos(searchValue, defaultPage);
            // $(".pageNumber").html("Page " + defaultPage + " of " + end);
            $(".pageNumber").html("Page " + defaultPage);
        }
        // console.log("This is the default page:", defaultPage);
    });
}

/*
ACCESSORY FUNCTIONS
*/
function smoothScrolling() {
    /*
    -smooth page scrolling -
    */
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1200, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
}

function fixedTop(){
    $(window).resize(function(){
        if ($(window).width() <= 760){	
            $("#nav-top").addClass("navbar-fixed-top");
        }	
    });
}

function closeNavOnClick(){
    $("#nav-lists a").click(function(){
        $(".navbar-collapse").collapse('hide');
    });
}

function iosBugFix(){
    var ua = navigator.userAgent,
    iOS = /iPad|iPhone|iPod/.test(ua),
    iOS11 = /OS 11_0|OS 11_1|OS 11_2/.test(ua);

    // ios 11 bug caret position
    if ( iOS && iOS11 ) {

        // Add CSS class to body
        $("body").addClass("iosBugFixCaret");

    }


}