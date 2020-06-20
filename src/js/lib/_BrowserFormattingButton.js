export default BrowserFormattingButton;

import DomButton from './_DomButton.js';
import SelectionWrapper from './_SelectionWrapper.js';

class BrowserFormattingButton {
    constructor(title, icon, tag, parentBlock) {
        let button = new DomButton(title, icon);
        button.addEventListener('click', function() {
            new SelectionWrapper(tag, parentBlock.view);       
        });
        return button;
    }
}