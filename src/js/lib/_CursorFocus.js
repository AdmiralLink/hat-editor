export default CursorFocus;

class CursorFocus {
    constructor(el) {
        el.focus();
        el.innerHTML = '<br>';
        let sel = window.getSelection();
        let range = document.createRange();
        range.setStart(el, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}