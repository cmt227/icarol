/* Collects an object of DOM elements that link to the
 * pages of search results.
 */
var pages = $("a[id^='cphBody_Page']", "#cphBody_tblPagingTop");
var page_links = _.map(pages, function(page) {
    return page.href;
});

// Collects an object containing program links on the current page.
var programs = $("a:contains('Details')", "#cphBody_tblResults");
var program_links = _.map(programs, function(program) {
    return program.href;
});

// The current page has an href == ""
var current_page = _.indexOf(page_links, "");

chrome.runtime.sendMessage({
    name: "program_links_list",
    links: program_links
});

// If we're on the last page of results, tell the extension
// that we're done and it will start processing the links.
// Otherwise, load the next page of results.
function loadNextPage() {
    if (current_page + 1 == page_links.length) {
        chrome.runtime.sendMessage({
            name: "done"
        });
    } else {
        pages[current_page + 1].click();
    }
}

loadNextPage();
