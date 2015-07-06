// The two possible county drop downs.
var dd1 = elemIsUnique( $("#cphBody_ddMailingCounty") );
var dd2 = elemIsUnique( $("#cphBody_ddPhysicalCounty") );

var save_btn = elemIsUnique( $("#cphBody_btnSaveBottom") );

var county = "Cortland";

// Sends a request to the extension to close the tab
// associated with this content script.
function close_tab() {
    chrome.runtime.sendMessage({
        name: "close_tab"
    });
}

// Good check for correctness: every possible execution path
// should end in the tab being closed or the dd(s) being modified
// and saved such that ddsAreComplete() or ddIsComplete() is true.

// Both drop downs are present.
if (dd1 != undefined && dd2 != undefined) {
    if (ddsAreComplete(dd1, dd2)) {
        close_tab();
    // If they can be set to "Cortland", do so.
    } else {
        ddSelect(dd1, county);
        ddSelect(dd2, county);
        save_btn.click();
    }
// Only the mailing county dd is present.
} else if (dd1 != undefined) {
    if (ddIsComplete(dd1)) 
        close_tab();
    else {
        ddSelect(dd1, county);
        save_btn.click();
    }
// Only the physical county dd is present.
} else if (dd2.value != undefined) {
    if ( ddIsComplete( dd2 ) ) 
        close_tab();
    else {
        ddSelect(dd2, county);
        save_btn.click();
    }
// No county dd is present.
} else {
    alert("Program missing county drop-downs.. :(");
}
