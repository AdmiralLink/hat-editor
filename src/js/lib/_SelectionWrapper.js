import DomEl from "./_DomEl";
import CursorFocus from "./_CursorFocus";

export default SelectionWrapper;

class SelectionWrapper {
    constructor(tag, view) {
        this.tag = tag;
        let sel = window.getSelection();
        if (sel.rangeCount) {
            if (view == 'content') {
                if (typeof(tag) == 'object') {
                    switch (tag[0]) {
                        case 'ol':
                            var command = 'insertOrderedList';
                            break;
                        case 'ul':
                            var command = 'insertUnorderedList';
                            break;
                    }
                    document.execCommand(command);
                    let nearestP = sel.anchorNode.parentElement.closest('p');
                    if (nearestP && nearestP.childNodes[0].nodeName.toLowerCase() == tag[0]) {
                        let ul = nearestP.childNodes[0];
                        nearestP.parentNode.insertBefore(ul, nearestP);
                        nearestP.remove();
                        new CursorFocus(ul.childNodes[0]);
                    }
                } else {
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
                        if (badTag) {
                            let regex = new RegExp('\<\/?' + badTag + '>', 'g');
                            let badClose = '</' + badTag + '>';
                            let goodClose = '</' + tag + '>';
                            let badOpen = badClose.replace('/','');
                            let goodOpen = goodClose.replace('/','');
                            sel.anchorNode.parentElement.outerHTML = sel.anchorNode.parentElement.outerHTML.replace(badOpen, goodOpen).replace(badClose, goodClose);
                        }
                    }
                }
            } else {
                let range = sel.getRangeAt(0);
                if (typeof(tag) == 'object') {
                    document.execCommand('insertText', false, '<' + tag[0] + '><' + tag[1] + '>' + range.toString() + '</' + tag[1] + '></' + tag[0] + '>');
                } else {
                    document.execCommand('insertText', false, '<' + tag + '>' + range.toString() + '</' + tag + '>');
                }
            }
        }
    }
}