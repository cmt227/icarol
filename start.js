// Script to navigate iCarol webapp and automatically
// update county info for resources.
// Started 30, June, 2015 by Carsten Thue-Bludworth

console.log("Executing start.js");

// Lists of urban centers in Cortland county

var cities = [
    "cortland",
];

var towns = [
    "cincinnatus",
    "cortlandville",
    "cuyler",
    "freetown",
    "harford",
    "homer",
    "lapeer",
    "marathon",
    "preble",
    "scott",
    "solon",
    "taylor",
    "truxton",
    "virgil",
    "willet",
];

var villages = [
    "homer",
    "marathon",
    "mcgraw",
];    

// List of HTML element IDs for iCarol navigation

var ids = {
    "resources": "hlResources",
    "resources_radio": "cphBody_rblSearchType_1",
    "filters": "cphBody_lblTagFilters",
    "specific_field": "cphBody_rblSearchScope_2",
    "field_dropdown": "cphBody_ddSearchScopeField",
    "search_box": "cphBody_txtSearch",
    "search_btn": "cphBody_btnSearch"
};

//** Begin program **//

function init_from_resources() {
    radio_btn_select( $("#" + ids.resources_radio) );
    radio_btn_select( $("#" + ids.specific_field) );
    drop_down_select( $("#" + ids.field_dropdown), "PhysicalCity" );
    var search_box = elem_is_unique( $("#" + ids.search_box) );
    var search_btn = elem_is_unique( $("#" + ids.search_btn) );
    search_box.value = "cortland";
    search_btn.click();
}

init_from_resources();

// Next script loaded is loop.js -- starts communication with
// event page.
