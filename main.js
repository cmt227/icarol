/* An object representing an integer counter.
 * Used to loop through result pages after a
 * search query.
 */
var intCtr = {
    val: 0,
    next: function() {
        return ++this.val;
    },
    reset: function() {
        this.val = 0;
    }
}

/* Returns the index of the next program link to
 * modify, using the intCtr to keep track.
 * If the next index is equal to the number of programs,
 * reset the counter and return -1 to signal that all
 * programs have been modified.
 */
function returnNextIndex( length ) {
    var index = intCtr.next();
    console.log("Index calculated by returnNextIndex(): " + index);
    if (index == length) {
        intCtr.reset();
        return -1;
    }
    return index;
}

// Represents the IDs of the open child tabs to edit a program page.
// TODO: change logic to remove state.. maybe the same thing can
// be accomplished with callbacks?
var open_child_tabs = [];


// Message passing logic.
chrome.runtime.onConnect.addListener( function( port ) {
    console.assert( port.name == "program_list_ready" );
    console.log("connected");
    /* When a message is recieved, it is a URL.
     * A new tab is created for each URL in the program list,
     * and from there each resource is updated in parallel.
     * Hopefully chrome doesn't crash lol.
     */
    port.onMessage.addListener( function( msg ) {
        switch (msg.name) {
            case "create_tab":
                console.log("Opening tab for url: " + msg.url);
                chrome.tabs.create({
                    url: msg.url
                },
                // callback function.
                function( tab ) {
                    open_child_tabs.push(tab.id); 
                });
                break;
            case "get_new_page_index":
                console.log("Waiting until child tabs close " +
                    "before sending new page index...");
                // Listens for closed tabs. When open_child_tabs is empty,
                // send a new page index to loop.js
                chrome.tabs.onRemoved.addListener( function( tabID, __ ) {
                    open_child_tabs = _.without(open_child_tabs, tabID);
                    if (open_child_tabs.length == 0)
                        port.postMessage( returnNextIndex ( msg.length ) );
                });
                break;
        }
    });
});

chrome.runtime.onMessage.addListener( function( message, sender, response ) {
    console.assert( message === "close_me",
        "Error recieving close request from tab id: " + sender.tab.id);
    console.log("Closing tab with id: " + sender.tab.id);
    chrome.tabs.remove(sender.tab.id);
});
