export default ParagraphBlock;

import Block from './_block.js';
import DomEl from './../lib/_DomEl.js';
import ParagraphToolbar from './_paragraphToolbar.js';
import CursorFocus from '../lib/_CursorFocus.js';

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
}