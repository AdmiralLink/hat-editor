export default DomButton;

import DomEl from './_DomEl';

class DomButton { 
    constructor(title, icon, btnClass, text) {
        let btn = (btnClass) ? 'button.' + btnClass : 'button';
        let buttonEl = new DomEl(btn + '[title="' + title + '"]');
        if (icon) {
            buttonEl.append(new DomEl('i.fas.fa-' + icon));
        }
        if (text) {
            let span = new DomEl('span');
            span.innerText = text;
            buttonEl.append(span);
        }
        return buttonEl
    }
}