// An array of program links for one search.
var program_links = [];

/* Recursively process the list of program links for a search.
 * For each url in links, a tab is opened, but tab n + 1 won't
 * be opened until tab n closes.
 * Precondition: links is a non-empty array of urls.
 */
function process(links) {
    if (links.length == 0)
        return;
    var head = _.first(links);
    var tail = _.rest(links);
    var id;
    chrome.tabs.create({url: head},
        function(tab) {
            id = tab.id;
        });
    if (tail.length == 0)
        return;
    else {
        chrome.tabs.onRemoved.addListener(function(tabId, __) {
            if (tabId == id) {
                process(tail);
            }
        });
    }
}

// A message listener to handle messages from content scripts.
chrome.runtime.onMessage.addListener(function(msg, sender, __) {
    switch(msg.name) {
        case "program_links_list":
            program_links = _.union(program_links, msg.links);
            break;
        case "done":
            process(program_links);
            break;
        case "close_tab":
            chrome.tabs.remove(sender.tab.id);
            break;
    }
});
