export default DomButton;

import DomEl from './_DomEl';

class DomButton { 
    constructor(title, icon, btnClass, text) {
        let btn = (btnClass) ? 'button.' + btnClass : 'button';
        let buttonEl = new DomEl(btn + '[title="' + title + '"]');
        if (text) {
            buttonEl.innerText = text;
        }
        if (icon) {
            buttonEl.append(new DomEl('i.fas.fa-' + icon));
        }
        return buttonEl
    }
}