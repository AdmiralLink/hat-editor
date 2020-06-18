export default DomButton;

import DomEl from './_DomEl.js';

class DomButton { 
    constructor(title, icon) {
        let buttonEl = new DomEl('button[title="' + title + '"]');
        buttonEl.append(new DomEl('i.fas.fa-' + icon));
        return buttonEl
    }
}