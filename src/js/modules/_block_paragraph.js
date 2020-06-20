export default ParagraphBlock;

import Block from './_block.js';
import CursorFocus from '../lib/_CursorFocus.js';
import DomEl from './../lib/_DomEl.js';
import ParagraphToolbar from './_paragraphToolbar.js';
import SelectionWrapper from '../lib/_SelectionWrapper.js';

class ParagraphBlock extends Block {
    createElement() {
        this.el.classList.add('paragraph');
        this.contentEl = new DomEl('div.contentContainer');
        this.editEl = new DomEl('div[contentEditable=true].editContainer');
        this.htmlEl = new DomEl('div.htmlView[contentEditable=true].flip');
        this.contentEl.appendChild(this.editEl);
        this.contentEl.appendChild(this.htmlEl);
        this.contentContainer.appendChild(this.contentEl);
        new ParagraphToolbar(this);
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

    getContent() {
        if (this.view == 'content') {
            return this.getHtmlFromContent();
        } else {
            return this.getContentFromHtml();
        }
    }

    getHtmlFromContent() {
        return this.editEl.innerHTML;
    }

    getContentFromHtml() {
        return this.htmlEl.innerText;
    }

    keyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
                switch(e.keyCode) {
                    case 85:
                        new SelectionWrapper(['ul','li'], this.view);
                        break;
                    case 79:
                        new SelectionWrapper(['ol', 'li'], this.view);
                        break;
                    case 49:
                        new SelectionWrapper('h1', this.view);
                        break;
                    case 50:
                        new SelectionWrapper('h2', this.view);
                        break;
                    case 51:
                        new SelectionWrapper('h3', this.view);
                        break;
                    case 52:
                        new SelectionWrapper('h4', this.view);
                        break;
                }
            }
            switch (e.keyCode) {
                case 66:
                case 98: 
                    e.preventDefault();
                    new SelectionWrapper('strong', this.view);
                    return false;
                    break;
                case 73:
                case 105: 
                    e.preventDefault();
                    new SelectionWrapper('em', this.view);
                    return false;
                    break;
                case 85:
                case 117: 
                    e.preventDefault();
                    new SelectionWrapper('u', this.view);
                    return false;
                    break;
                
            }
        }
    }
}