export default BrowserFormattingButton;

import DomButton from './_DomButton.js';

class BrowserFormattingButton {
    constructor(command, title, icon, tag, view) {
        let button = new DomButton(title, icon);
        button.addEventListener('click', function() {
            if (view == 'content') {
                document.execCommand(command);
            } else {
                new SelectionWrapper(tag);
            }
        });
        return button;
    }
}