import DomEl from "./_DomEl";

export default SelectionWrapper;

class SelectionWrapper {
    constructor(tag, view, opts) {
        this.getSelection();
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
                    let parent = this.sel.anchorNode.parentElement;
                    this.getSelection();
                    if (tag == 'a') {
                        if (opts.target) {
                            parent.setAttribute('target', opts.target);
                        }
                        if (opts.text !== parent.innerText) {
                            let a = (parent.tagName.toLowerCase() == 'a') ? parent : this.sel.anchorNode;
                            let range = this.range;
                            parent.innerText = opts.text;
                            this.range.selectNode(a);
                        }
                    }
                    if (badTag) {
                        let badEl = this.sel.focusNode.parentElement;
                        let newEl = new DomEl(tag);
                        newEl.innerHTML = badEl.innerHTML;
                        badEl.parentElement.insertBefore(newEl, badEl);
                        badEl.remove();
                        this.range.selectNode(newEl);
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
                let replacement = '';
                let startPos = this.range.startOffset;
                if (typeof(tag) == 'object') {
                    replacement = '<' + tag[0] + '><' + tag[1] + '>' + text + '</' + tag[1] + '></' + tag[0] + '>';
                } else {
                    replacement = '<' + tag + optString + '>' + text + '</' + tag + '>';
                }
                document.execCommand('insertText', false, replacement);
                this.getSelection();
                this.range.setStart(this.range.startContainer, startPos);
            }
        }
    }

    checkNearestP(tag) {
        let nearestP = this.sel.anchorNode.parentElement.closest('p');
        if (nearestP && nearestP.childNodes[0].nodeName.toLowerCase() == tag) {
            let node = nearestP.childNodes[0];
            nearestP.parentNode.insertBefore(node, nearestP);
            nearestP.remove();
        }
    }

    getSelection() {
        this.sel = window.getSelection();
        this.range = this.sel.getRangeAt(0);
    }
}