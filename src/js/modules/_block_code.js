export default CodeBlock;

import Block from './_block';
import DomEl from './../lib/_DomEl';

class CodeBlock extends Block {
    createElement() {
        this.el.classList.add('code');
        this.contentEl = new DomEl('textarea.codespace');
        this.contentContainer.appendChild(this.contentEl);
    }

    getContents() {
        let content = {
            settings: this.mechanic.getValues(),
            type: 'code',
            content: this.contentEl.value
        };
        return content;
    }

    keyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.keyCode) {
                // B
                case 66:
                // I
                case 73:
                // U
                case 85: 
                    e.preventDefault();
                break;
                case 32:
                    e.preventDefault();
                    document.execCommand('insertHTML', false, '\t');
                break;
            }
        }
    }

    loadContent() {
        if (this.content) {
            this.contentEl.value = this.content;
            delete this.content;
        }
    }
}