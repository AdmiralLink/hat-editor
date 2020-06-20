export default ParagraphToolbar;

import DomButton from './../lib/_DomButton.js';
import DomEl from './../lib/_DomEl.js';
import MiniModal from '../lib/_MiniModal.js';
import BrowserFormattingButton from './../lib/_BrowserFormattingButton.js';

class ParagraphToolbar {
    constructor(paragraphBlock) {
        this.parentBlock = paragraphBlock;
        this.container = new DomEl('div.toolbar[aria-label="Paragraph block toolbar"]');
        this.addFormattingButtons();
        this.addHtmlView();
        paragraphBlock.contentContainer.insertBefore(this.container, paragraphBlock.contentEl);
    }

    addFormattingButtons() {
        this.container.append(new BrowserFormattingButton('bold', 'Make selected text bold', 'bold', 'strong', this.parentBlock));
        this.container.append(new BrowserFormattingButton('italic', 'Make selected text italic', 'italic', 'em', this.parentBlock));
        this.container.append(new BrowserFormattingButton('underline', 'Make selected text underlined', 'underline', 'u', this.parentBlock));
        //toolbar.container.append(new BrowserFormattingButton('insertOrderedList', 'Create ordered list', 'bold', ['ol', 'li']));
    }

    addHtmlView() {
        let toolbar = this;
        let el = new DomButton('View HTML', 'laptop-code');
        el.addEventListener('click', function() {
            toolbar.toggleHtmlView();
        });
        toolbar.container.append(el);
    }

    toggleHtmlView() {
        if (this.parentBlock.view == 'content') {
            let code = this.parentBlock.getHtmlFromContent();
            this.parentBlock.htmlEl.innerText = code;
            this.parentBlock.view = 'html';
        } else {
            let html = this.parentBlock.getContentFromHtml();
            this.parentBlock.editEl.innerHTML = html;
            this.parentBlock.view = 'content';
        }
        this.parentBlock.editEl.classList.toggle('flip');
        this.parentBlock.htmlEl.classList.toggle('flip');
        this.parentBlock.focus();
    }
}
