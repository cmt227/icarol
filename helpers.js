//** Helper functions **//

/* Returns the DOM element from an array if that
 * element is unique, otherwise throws an exception.
 */
function elemIsUnique( element ) {
    if ( element.length = 1 ) {
        return element[0];
    } else {
        throw new Error("Non-unique element ID: " + element);
    }
}

// Selects a radio button btn.
function radioBtnSelect( btn ) {
    var b = elemIsUnique( btn );
    if ( !b.checked ) {
        b.click();
    }
}

// Selects menu entry 'field' from a drop down menu dd.
function ddSelect( dd, field ) {
    var d = elemIsUnique( dd );
    d.value = field;
}

/* truth table:
 * dd has cortland and it's selected -> true
 * dd doesn't have cortland          -> true
 * dd has cortland but it's not 
 *   selected                        -> false
 * Precondition: dd is a defined DOM drop-down menu.
 */
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

// Precondition: dd1 and dd2 are defined DOM drop-down menus.
function ddsAreComplete(dd1, dd2) {
    return ddIsComplete(dd1) && ddIsComplete(dd2);
}
