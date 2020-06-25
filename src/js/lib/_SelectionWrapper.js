import DomEl from "./_DomEl";
import CursorFocus from "./_CursorFocus";

export default SelectionWrapper;

class SelectionWrapper {
    constructor(tag, view, opts) {
        this.sel = window.getSelection();
        let range = this.sel.getRangeAt(0);
        if (this.sel.rangeCount) {
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
                    if ( !this.sel.anchorNode.parentElement.tagName.toLowerCase() == 'div' && this.sel.parentElement.parentElement.classList.hasClass('editContainer')) {
                        document.execCommand('formatBlock', false, 'div');
                    }
                    if (this.sel.anchorNode.parentElement.tagName.toLowerCase() == tag[0]) {
                        document.execCommand('indent');
                    } else {
                        document.execCommand(command);
                    }
                    this.checkNearestP(tag[0])
                } else {
                    var badTag = false;
                    var commandTag = false;
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
                            var command = 'underline';
                            break;
                        case 'h1':
                        case 'h2':
                        case 'h3':
                        case 'h4':
                        case 'p':
                            var command = 'formatBlock';
                            commandTag = tag;
                            break;
                        case 'a':
                            var command = 'createLink';
                            commandTag = opts.href;
                            break;
                    } 
                    document.execCommand(command, false, commandTag);
                    if (tag == 'a') {
                        if (opts.target) {
                            this.sel.anchorNode.parentElement.setAttribute('target', opts.target);
                        }
                        if (opts.text) {
                            this.sel.anchorNode.parentElement.innerText = opts.text;
                        }
                    }
                    if (badTag) {
                        let regex = new RegExp('\<\/?' + badTag + '>', 'g');
                        let badClose = '</' + badTag + '>';
                        let goodClose = '</' + tag + '>';
                        let badOpen = badClose.replace('/','');
                        let goodOpen = goodClose.replace('/','');
                        this.sel.anchorNode.parentElement.outerHTML = this.sel.anchorNode.parentElement.outerHTML.replace(badOpen, goodOpen).replace(badClose, goodClose);
                    }
                }
            } else {
                let optString = '';
                let text = this.sel.toString();
                if (opts) {
                    optString = ' ';
                    if (opts.text) {
                        text = opts.text;
                        delete opts.text;
                    }
                    for (let [key, value] of Object.entries(opts)) {
                        optString += key + '="' + value + '" '; 
                    }
                    optString = optString.substr(0, optString.length -1);
                }
                if (typeof(tag) == 'object') {
                    document.execCommand('insertText', false, '<' + tag[0] + '><' + tag[1] + '>' + text + '</' + tag[1] + '></' + tag[0] + '>');
                } else {
                    document.execCommand('insertText', false, '<' + tag + optString + '>' + text + '</' + tag + '>');
                }
            }
        }
    }

    checkNearestP(tag) {
        let nearestP = this.sel.anchorNode.parentElement.closest('p');
        if (nearestP && nearestP.childNodes[0].nodeName.toLowerCase() == tag) {
            let node = nearestP.childNodes[0];
            nearestP.parentNode.insertBefore(node, nearestP);
            nearestP.remove();
            new CursorFocus(node.childNodes[0]);
        }
    }
}