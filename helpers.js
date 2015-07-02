//** Helper functions **//

/* Returns the DOM element from an array if that
 * element is unique, otherwise throws an exception.
 */
function elem_is_unique( element ) {
    if ( element.length = 1 ) {
        return element[0];
    } else {
        throw new Error("Non-unique element ID: " + element);
    }
}

// Selects a radio button btn.
function radio_btn_select( btn ) {
    var b = elem_is_unique( btn );
    if ( !b.checked ) {
        b.click();
    }
}

// Selects menu entry 'field' from a drop down menu dd.
function drop_down_select( dd, field ) {
    var d = elem_is_unique( dd );
    d.value = field;
}
