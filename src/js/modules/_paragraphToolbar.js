export default ParagraphToolbar;

import DomButton from './../lib/_DomButton.js';
import DomEl from './../lib/_DomEl.js';

class ParagraphToolbar {
    constructor(paragraphBlock) {
        this.container = new DomEl('div.toolbar[aria-label="Paragraph block toolbar"]');
        this.addFormattingButtons();
        this.addHtmlView();
        this.parentBlock = paragraphBlock;
        paragraphBlock.contentContainer.insertBefore(this.container, paragraphBlock.contentEl);
    }

    addFormattingButtons() {
        let toolbar = this;
        let bold = new DomButton('Make selected text bold', 'bold');
        toolbar.container.append(bold);
        let italic = new DomButton('Make selected text italicized', 'italic');
        toolbar.container.append(italic);
        let underline = new DomButton('Make selected text underlined', 'underline');
        toolbar.container.append(underline);
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
