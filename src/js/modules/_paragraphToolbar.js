export default ParagraphToolbar;

import DomButton from './../lib/_DomButton.js';
import DomEl from './../lib/_DomEl.js';
import MiniModal from '../lib/_MiniModal.js';
import BrowserFormattingButton from './../lib/_BrowserFormattingButton.js';
import SelectionWrapper from '../lib/_SelectionWrapper.js';

class ParagraphToolbar {
    constructor(paragraphBlock) {
        this.parentBlock = paragraphBlock;
        this.container = new DomEl('div.toolbar[aria-label="Paragraph block toolbar"]');
        this.addFormattingButtons();
        this.addHeaderButton();
        this.addHtmlView();
        paragraphBlock.contentContainer.insertBefore(this.container, paragraphBlock.contentEl);
    }

    addFormattingButtons() {
        this.container.append(new BrowserFormattingButton('Make selected text bold', 'bold', 'strong', this.parentBlock));
        this.container.append(new BrowserFormattingButton('Make selected text italic', 'italic', 'em', this.parentBlock));
        this.container.append(new BrowserFormattingButton('Make selected text underlined', 'underline', 'u', this.parentBlock));
        this.container.append(new BrowserFormattingButton('Create ordered list', 'list-ul', ['ul', 'li'], this.parentBlock));
        this.container.append(new BrowserFormattingButton('Create ordered list', 'list-ol', ['ol', 'li'], this.parentBlock));
    }

    addHeaderButton() {
        let toolbar = this; 
        ['h1','h2','h3','h4'].forEach(function(header) {
            let btn = new DomButton('Insert/convert to ' + header, false, 'textBtn', header);
            btn.addEventListener('click', function() {
                new SelectionWrapper(header, toolbar.parentBlock.view);
            });
            toolbar.container.append(btn);
        });
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
