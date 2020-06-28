export default ParagraphBlock;

import Block from './_block';
import CursorFocus from '../lib/_CursorFocus';
import DomEl from './../lib/_DomEl';
import ParagraphToolbar from './_paragraphToolbar';
import SelectionWrapper from '../lib/_SelectionWrapper';
import StyleMechanic from './_mechanic_style';

class ParagraphBlock extends Block {
    createElement() {
        this.el.classList.add('paragraph');
        this.contentEl = new DomEl('div.contentContainer');
        this.editEl = new DomEl('div[contentEditable=true].editContainer');
        this.htmlEl = new DomEl('div.htmlView[contentEditable=true].flip');
        this.contentEl.appendChild(this.editEl);
        this.contentEl.appendChild(this.htmlEl);
        this.contentContainer.appendChild(this.contentEl);
        this.toolbar = new ParagraphToolbar(this);
    }

    focus() {
        if (this.view == undefined) {
            this.view = 'content';
            let starterP = new DomEl('p');
            this.editEl.append(starterP);
            new CursorFocus(starterP);
        } else if (this.view == 'content') {
            this.editEl.focus();
        } else {
            this.htmlEl.focus();
        }
    }

    getContents() {
        let content = {
            settings: this.mechanic.getValues(),
            type: 'paragraph'
        };
        if (this.view == 'content') {
            content.content = this.getHtmlFromContent();
        } else {
            content.content = this.getContentFromHtml();
        }
        return content;
    }

    getHtmlFromContent() {
        return this.editEl.innerHTML;
    }

    getContentFromHtml() {
        return this.htmlEl.innerText;
    }

    insideTag(tag) {
        if (this.view == 'content') {
            let sel = window.getSelection();
            if (sel.anchorNode.parentElement.closest(tag) && sel.anchorNode.parentElement.closest('.editContainer') == this.editEl) {
                return true;
            } else if (sel.focusNode.parentElement.closest(tag) && sel.focusNode.parentElement.closest('.editContainer') == this.editEl) {
                return true;
            }
        }
        return false;
    }

    keyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
                switch(e.keyCode) {
                    case 79:
                        new SelectionWrapper(['ol', 'li'], this.view);
                        return false;
                        break;
                    case 85:
                        new SelectionWrapper(['ul','li'], this.view);
                        return false;
                        break;
                    case 73:
                        this.toolbar.addImage();
                        break;
                    case 75:
                        this.toolbar.unlink();
                        return false;
                    case 49:
                        new SelectionWrapper('h1', this.view);
                        return false;
                        break;
                    case 50:
                        new SelectionWrapper('h2', this.view);
                        return false;
                        break;
                    case 51:
                        new SelectionWrapper('h3', this.view);
                        return false;
                        break;
                    case 52:
                        new SelectionWrapper('h4', this.view);
                        return false;
                        break;
                }
            }
            switch (e.keyCode) {
                case 186:
                    if (this.insideTag('ul') || this.insideTag('ol')) {
                        e.preventDefault();
                        document.execCommand('outdent');
                        return false;
                    }
                    break;
                case 192:
                case 222:
                    if (this.insideTag('ul') || this.insideTag('ol')) {
                        e.preventDefault();
                        document.execCommand('indent');
                        return false;
                    }
                    break;
                case 66: 
                    e.preventDefault();
                    new SelectionWrapper('strong', this.view);
                    return false;
                    break;
                case 73: 
                    e.preventDefault();
                    new SelectionWrapper('em', this.view);
                    return false;
                    break;
                case 85: 
                    e.preventDefault();
                    new SelectionWrapper('u', this.view);
                    return false;
                    break;
                case 75:
                    e.preventDefault();
                    this.toolbar.addLink();
                    return false;
                    break;
            }
        }
    }

    registerMechanics() {
        super.registerMechanics();
        this.mechanic.add(new StyleMechanic());
    }
}