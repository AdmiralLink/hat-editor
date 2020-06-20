import DomEl from "./_DomEl";

export default SelectionWrapper;

class SelectionWrapper {
    constructor(el) {
        let sel = window.getSelection();
        if (sel.rangeCount) {
            let range = sel.getRangeAt(0);
            document.execCommand('insertText', false, '<' + el + '>' + range.toString() + '</' + el + '>');
        }
    }
}