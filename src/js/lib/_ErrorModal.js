export default ErrorModal;

import MiniModal from './_MiniModal.js';
import DomEl from './_DomEl.js';

class ErrorModal extends MiniModal {
    constructor(errorMessage) {
        let errorDiv = new DomEl('div.error');
        errorDiv.append(new DomEl('i.fas.fa-exclamation-circle'));
        errorDiv.append(new DomEl('br'));
        errorDiv.append(new DomEl('p').innerText = errorMessage);
        super({
            closeX: false,
            confirmButtonClass: false,
            contentType: 'node',
            content: errorDiv,
            header: 'Error',
            special: 'super'
        });
    }
}