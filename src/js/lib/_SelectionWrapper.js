import DomEl from "./_DomEl";

export default SelectionWrapper;

class SelectionWrapper {
    constructor(tag, view) {
        this.tag = tag;
        let sel = window.getSelection();
        if (sel.rangeCount) {
            if (view == 'content') {
                switch (tag) {
                    case 'strong':
                        var badTag = 'b';
                        var command = 'bold';
                        break;
                    case 'em':
                        var badTag = 'i';
                        var command = 'italic';
                        break;
                    case 'u':
                        var badTag = false;
                        var command = 'underline';
                        break;
                } 
                if (!sel.isCollapsed) {
                    document.execCommand(command);
                    if (badTag && !sel.anchorNode.parentElement.classList.contains('editContainer')) {
                        let regex = new RegExp('\<\/?' + badTag + '>', 'g');
                        let badClose = '</' + badTag + '>';
                        let goodClose = '</' + tag + '>';
                        let badOpen = badClose.replace('/','');
                        let goodOpen = goodClose.replace('/','');
                        sel.anchorNode.parentElement.outerHTML = sel.anchorNode.parentElement.outerHTML.replace(badOpen, goodOpen).replace(badClose, goodClose);
                    }
                }
            } else {
                let range = sel.getRangeAt(0);
                document.execCommand('insertText', false, '<' + tag + '>' + range.toString() + '</' + tag + '>');
            }
        }
    }
}