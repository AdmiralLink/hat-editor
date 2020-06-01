export default ParagraphBlock;

import Block from '_block.js';
import DomEl from '/../lib/_DomEl.js';

class ParagraphBlock extends Block {
    createElement() {
        this.el.classList.add('paragraph');
        this.contentEl = new DomEl('div[contentEditable=true]');
        this.contentContainer.appendChild(this.contentEl);
    }
}