export default BrowserFormattingButton;

import DomButton from './_DomButton';
import SelectionWrapper from './_SelectionWrapper';

class BrowserFormattingButton {
    constructor(title, icon, tag, parentBlock) {
        let button = new DomButton(title, icon);
        button.addEventListener('click', function(e) {
            e.preventDefault();
            new SelectionWrapper(tag, parentBlock.view);       
        });
        return button;
    }
}