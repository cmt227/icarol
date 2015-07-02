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

// Represents the number of pages worth of results for the search.
var num_pages;

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
        if (msg.name == "create_tab") {
            console.count("Opening tab");
            chrome.tabs.create({
                url: msg.url
            },
            // callback function.
            function( tab ) {
                open_child_tabs.push(tab.id); 
            });
            // refresh num_pages.
            num_pages = msg.num_pages;
        } else {
            console.warn("Recieved an unknown message!");
        }
    });
    // If closed tab was opened by the extention (i.e. it is in
    // open_child_tabs), then remove it and conditionally send a message.
    chrome.tabs.onRemoved.addListener( function( tabID, __ ) {
        if ( _.contains( open_child_tabs, tabID ) ) {
            open_child_tabs = _.without(open_child_tabs, tabID);
            if ( open_child_tabs.length == 0 )
                port.postMessage( returnNextIndex ( num_pages ) );
        }
    });
});


chrome.runtime.onMessage.addListener( function( message, sender, response ) {
    console.assert( message === "close_me",
        "Error recieving close request from tab id: " + sender.tab.id);
    console.count("Closing tab with id " + sender.tab.id);
    chrome.tabs.remove(sender.tab.id);
});
