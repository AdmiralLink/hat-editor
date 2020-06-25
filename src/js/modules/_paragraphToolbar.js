export default ParagraphToolbar;

import BrowserFormattingButton from './../lib/_BrowserFormattingButton';
import debounce from './../lib/_Debounce';
import DomButton from './../lib/_DomButton';
import DomEl from './../lib/_DomEl';
import ImageUploadModal from './_ImageUploadModal';
import LinkModal from './_LinkModal';
import SelectionWrapper from '../lib/_SelectionWrapper';

class ParagraphToolbar {
    constructor(paragraphBlock) {
        this.parentBlock = paragraphBlock;
        this.container = new DomEl('div.toolbar[aria-label="Paragraph block toolbar"]');
        this.addFormattingButtons();
        this.addHeaderButton();
        this.addImageButton();
        this.addLinkButton();
        this.addUnlinkButton();
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

    addLink() {
        let targetLink = false;
        let sel = window.getSelection();
        let range = sel.getRangeAt(0);
        let options = {
            text: range.toString()
        };
        let anchorEl = sel.anchorNode.parentElement;
        let focusEl = sel.focusNode.parentElement;
        if (this.parentBlock.view == 'content') {
            if (sel.isCollapsed && anchorEl.tagName.toLowerCase() == 'a') {
                options.href = anchorEl.getAttribute('href');
                options.blank = (anchorEl.getAttribute('target') == '_blank');
                options.text = anchorEl.innerText;
                options.updateExisting = true;
            } else if (anchorEl == focusEl && anchorEl.tagName.toLowerCase() == 'a') {
                options.href = anchorEl.getAttribute('href');
                options.blank = (anchorEl.getAttribute('target') == '_blank');
            } else if (this.checkForAnchorTag()) {
                let theTag = this.checkForAnchorTag();
                options.href = theTag.getAttribute('href');
                options.blank = (theTag.getAttribute('target') == '_blank');
            }
        }
        let link = new LinkModal(options);
        let toolbar = this;
        link.modalContainer.addEventListener('confirmed', (e) => {
            toolbar.returnCursor(sel, range);
            let values = link.values;
            if (link.updateExisting) {
                let theLink = sel.anchorNode.parentElement;
                theLink.setAttribute('href', values.href);
                if (options.blank && theLink.getAttribute('target') !== '_blank') {
                    theLink.setAttribute('target', '_blank')
                } else if ( !options.blank && theLink.getAttribute('target') == '_blank') {
                    theLink.setAttribute('target', '');
                }
                theLink.innerText = values.text;
                return true;
            }
            new SelectionWrapper('a', toolbar.parentBlock.view, values);
        });
        link.modalContainer.addEventListener('canceled', (e) => {
            toolbar.returnCursor(sel, range);
        });
    }

    addImage() {
        let sel = window.getSelection();
        let range = sel.getRangeAt(0);
        let image = new ImageUploadModal();
        let toolbar = this;
        image.modalContainer.addEventListener('uploaded', (e) => {
            toolbar.returnCursor(sel, range);
            if (toolbar.parentBlock.view == 'content') {
                document.execCommand('insertHTML', false, image.imageEl.outerHTML);
            } else {
                document.execCommand('insertText', false, image.imageEl.outerHTML);
            }
        });
        image.modalContainer.addEventListener('canceled', (e) => {
            toolbar.returnCursor(sel, range);
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

    addLinkButton() {
        let toolbar = this;
        let el = new DomButton('Insert Link', 'link');
        el.addEventListener('click', function() {
            toolbar.addLink();
        });
        this.contextButtons.push(el);
        toolbar.container.append(el);
    }

    addUnlinkButton() {
        let toolbar = this;
        this.unlinkBtn = new DomButton('Unlink text', 'unlink');
        this.parentBlock.editEl.addEventListener('focus', () => {
            toolbar.checkForLink();
        });
        this.parentBlock.editEl.addEventListener('viewChange', () => {
            toolbar.checkForLink();
        });
        this.parentBlock.editEl.addEventListener('keydown', () => {
            toolbar.debounceLinkCheck();
        });
        this.unlinkBtn.addEventListener('click', function() {
            toolbar.unlink();
        });
        toolbar.container.append(this.unlinkBtn);
    }

    checkForAnchorTag() {
        if (!sel) {
            var sel = window.getSelection();
        }
        if (!range) {
            var range = sel.getRangeAt(0);
        }
        let contents = range.cloneContents();
        for (let theNode of contents.children) {
            if (theNode.tagName.toLowerCase() == 'a') {
                return theNode;
            }
        }
        return false;
    }

    checkForLink() {
        let linkFound = false;
        let sel = window.getSelection();
        let range = sel.getRangeAt(0);
        if (sel.anchorNode.parentElement.tagName.toLowerCase() == 'a' || sel.focusNode.parentElement.tagName.toLowerCase() == 'a') {
            linkFound = true;
        } else {
            if (this.checkForAnchorTag()) {
                linkFound = true;
            }
        }
        if (linkFound) {
            this.unlinkBtn.removeAttribute('disabled');  
        } else {
            this.unlinkBtn.setAttribute('disabled', true);
        }
    }

    debounceLinkCheck = debounce(() => {
        this.checkForLink();
    }, 350);

    returnCursor(sel, range) {
        if (this.parentBlock.view == 'content') { 
            this.parentBlock.editEl.focus();
        } else {
            this.parentBlock.htmlEl.focus();
        }
        sel.removeAllRanges();
        sel.addRange(range);
        this.checkForLink();
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
        this.parentBlock.dispatchEvent('viewChange');
        this.parentBlock.focus();
    }

    unlink() {
        let link = false;
        let sel = window.getSelection();
        if (sel.anchorNode.parentElement.tagName.toLowerCase() == 'a') {
            link = sel.anchorNode.parentElement;
        } else if (sel.focusNode.parentElement.tagName.toLowerCase() == 'a') {
            link = sel.focusNode.parentElement;
        } else if (this.checkForAnchorTag())
            link = this.checkForAnchorTag();
        if (link) {
            let oldRange = sel.getRangeAt(0);
            let range = new Range();
            range.selectNode(link);
            sel.removeAllRanges();
            sel.addRange(range);            
            document.execCommand('unlink');
            sel.removeAllRanges();
            sel.addRange(oldRange);
        }
    }
}
