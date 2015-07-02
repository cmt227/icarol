console.log("Executing loop.js");

/* Collects an object of DOM elements that link to the
 * pages of search results.
 */
var result_pages = $("a[id^='cphBody_Page']", "#cphBody_tblPagingTop");

// Collects an object containing program links on the current page.
var program_links = $("a:contains('Details')", "#cphBody_tblResults");

// Loads the results page referred to by results_pages[ index ].
function loadResultsPage( index ) {
    if (index == -1) {
        console.log("I think we got 'em all, Bob!");
    } else {
        console.log("Loading page number: " + (index + 1));
        result_pages[index].click();
    }
}

// Notify the extention once the program list has been loaded.
var port = chrome.runtime.connect({
    name: "program_list_ready"
});

// Alert me if there are more than 16 programs on any one search page.
if ( program_links.length > 15 )
    alert(program_links.length + " tabs are about to be opened..");
// Send each program URL to the event page to be processed.
for (var i = 0; i < program_links.length; i = i + 1) {
    port.postMessage({
        name: "create_tab",
        url: program_links[i].href,
        num_pages: result_pages.length
    });
}

// Runs when a new page of search results is to be loaded.
port.onMessage.addListener(function( nextIndex ) {
    console.log("Message received. Next index: " + nextIndex);
    loadResultsPage( nextIndex );
});
