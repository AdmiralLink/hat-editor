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
        this.addHtmlView();
        this.fixKeyboardShortcuts();
        paragraphBlock.contentContainer.insertBefore(this.container, paragraphBlock.contentEl);
    }

    addFormattingButtons() {
        this.container.append(new BrowserFormattingButton('Make selected text bold', 'bold', 'strong', this.parentBlock));
        this.container.append(new BrowserFormattingButton('Make selected text italic', 'italic', 'em', this.parentBlock));
        this.container.append(new BrowserFormattingButton('Make selected text underlined', 'underline', 'u', this.parentBlock));
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

    fixKeyboardShortcuts() {
        let parentBlock = this.parentBlock; 
        this.parentBlock.contentContainer.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch (e.keyCode) {
                    case 66:
                        case 98: 
                        e.preventDefault();
                        new SelectionWrapper('strong', parentBlock.view);
                        return false;
                        break;
                    case 73:
                    case 105: 
                        e.preventDefault();
                        new SelectionWrapper('em', parentBlock.view);
                        return false;
                        break;
                    case 85:
                    case 117: 
                        e.preventDefault();
                        new SelectionWrapper('u', parentBlock.view);
                        return false;
                        break;
                }
            }
        });
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
