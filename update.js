console.log("Executing update.js");

// The two possible county drop downs.
var county_dd1 = elem_is_unique( $("#cphBody_ddMailingCounty") );
var county_dd2 = elem_is_unique( $("#cphBody_ddPhysicalCounty") );

var save_btn = elem_is_unique( $("#cphBody_btnSaveBottom") );

// return the truth of:
// dds with the option "Cortland" have that as their value.
function ddsAreComplete() {
    var one;
    if ( _.contains(county_dd1.options, "Cortland") ) {
        if (county_dd1.value == "Cortland")
            one = true;
        else
            one = false;
    } else {
        one = true;
    }
    var two;
    if ( _.contains(county_dd2.options, "Cortland") ) {
        if (county_dd2.value == "Cortland")
            two = true;
        else
            two = false;
    } else {
        two = true;
    }
    return one && two;
}

// returns the truth of:
// If dd has "Cortland" as an option, it is set.
function ddIsComplete( dd ) {
    if ( _.contains(dd.options, "Cortland") ) {
        if (dd.value == "Cortland")
            return true;
        else
            return false;
    } else {
        return true;
    }
}

// Good check for correctness: every possible execution path
// should end in the tab being closed or the dd(s) being modified
// and saved such that ddsAreComplete() or ddIsComplete() is true.

// Both drop downs are present.
if (county_dd1 != undefined && county_dd2 != undefined) {
    console.log("Entered if block.");
    if ( ddsAreComplete() ) 
        chrome.runtime.sendMessage("close_me");
    // If they can be set to "Cortland", do so.
    else {
        if ( _.contains(county_dd1.options, "Cortland") )
            county_dd1.value = "Cortland";
        if ( _.contains(county_dd2.options, "Cortland") )
            county_dd2.value = "Cortland";
        save_btn.click();
    }
// Only the mailing county dd is present.
} else if (county_dd1 != undefined) {
    if ( ddIsComplete( county_dd1 ) ) 
        chrome.runtime.sendMessage("close_me");
    else {
        county_dd1.value = "Cortland";
        save_btn.click();
    }
// Only the physical county dd is present.
} else if (county_dd2.value != undefined) {
    if ( ddIsComplete( county_dd2 ) ) 
        chrome.runtime.sendMessage("close_me");
    else {
        county_dd2.value = "Cortland";
        save_btn.click();
    }
// No county dd is present.
} else {
    console.log("Program missing county drop-downs.. :(");
    alert("Program missing county drop-downs.. :(");
    chrome.runtime.sendMessage("close_me");
}
