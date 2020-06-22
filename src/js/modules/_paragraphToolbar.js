export default ParagraphToolbar;

import BrowserFormattingButton from './../lib/_BrowserFormattingButton.js';
import DomButton from './../lib/_DomButton.js';
import DomEl from './../lib/_DomEl.js';
import ImageUploadModal from '../lib/_ImageUploadModal.js';
import SelectionWrapper from '../lib/_SelectionWrapper.js';

class ParagraphToolbar {
    constructor(paragraphBlock) {
        this.parentBlock = paragraphBlock;
        this.container = new DomEl('div.toolbar[aria-label="Paragraph block toolbar"]');
        this.addFormattingButtons();
        this.addHeaderButton();
        this.addImageButton();
        this.addHtmlView();
        this.addFocusShield();
        paragraphBlock.contentContainer.insertBefore(this.container, paragraphBlock.contentEl);
    }

    addFocusShield() {
        let toolbar = this;
        var timeout = false; 
        this.parentBlock.contentContainer.addEventListener('focusin', function() {
            if (timeout) {
                clearTimeout(timeout);
            }
            toolbar.contextButtons.forEach(el => {
                el.removeAttribute('disabled');
            });
        });
        this.parentBlock.contentContainer.addEventListener('focusout', function() {
            /* Focusout will detect child focus outs (good), but even if we switch to another child, e.g., a button.
            We therefore check if the container contains the active element; if not, that means we disable the buttons.
            But focusout fires before the next focusin, so we delay slightly */
            timeout = setTimeout(function() {
                if (!toolbar.parentBlock.contentContainer.contains(document.activeElement)) {
                    toolbar.contextButtons.forEach(el => {
                        el.setAttribute('disabled', 'disabled');
                    });
                }
            }, 1);
        });
    }

    addFormattingButtons() {
        let bold = new BrowserFormattingButton('Make selected text bold', 'bold', 'strong', this.parentBlock);
        this.container.append(bold);
        let italic = new BrowserFormattingButton('Make selected text italic', 'italic', 'em', this.parentBlock);
        this.container.append(italic);
        let underline = new BrowserFormattingButton('Make selected text underlined', 'underline', 'u', this.parentBlock);
        this.container.append(underline);
        let ul = new BrowserFormattingButton('Create ordered list', 'list-ul', ['ul', 'li'], this.parentBlock);
        this.container.append(ul);
        let ol = new BrowserFormattingButton('Create ordered list', 'list-ol', ['ol', 'li'], this.parentBlock);
        this.container.append(ol);
        this.contextButtons = [bold, italic, underline, ul, ol];
    }

    addHeaderButton() {
        let toolbar = this; 
        ['h1','h2','h3','h4'].forEach(function(header) {
            let btn = new DomButton('Insert/convert to ' + header, false, 'textBtn', header);
            btn.addEventListener('click', function() {
                new SelectionWrapper(header, toolbar.parentBlock.view);
            });
            toolbar.contextButtons.push(btn);
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

    addImage() {
        let sel = window.getSelection();
        let range = sel.getRangeAt(0);
        let image = new ImageUploadModal();
        let toolbar = this;
        image.modalContainer.addEventListener('uploaded', (e) => {
            if (toolbar.parentBlock.view == 'content') {
                toolbar.parentBlock.contentEl.focus();
                sel.removeAllRanges();
                sel.addRange(range);
                document.execCommand('insertHTML', false, image.imageEl.outerHTML);
            } else {
                toolbar.parhtmlEl.focus();
                sel.removeAllRanges();
                sel.addRange(range);
                document.execCommand('insertText', false, image.imageEl.outerHTML);
            }
        });
    }

    addImageButton() {
        let toolbar = this;
        let el = new DomButton('Insert image', 'image');
        el.addEventListener('click', function() {
            toolbar.addImage();
        });
        this.contextButtons.push(el);
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
            if (this.parentBlock.editEl.children) {
                for (let el of this.parentBlock.editEl.children) {
                    if (!el.innerHTML) {
                        el.innerHTML = '<br>';
                    }
                }
            }
            this.parentBlock.view = 'content';
        }
        this.parentBlock.editEl.classList.toggle('flip');
        this.parentBlock.htmlEl.classList.toggle('flip');
        this.parentBlock.focus();
    }
}
