export default InputField;

import DomEl from './_DomEl.js';

class InputField {
    constructor(id, labelName, placeholder, type) {
        type = type || 'text';
        let inputString = 'input#' + id + '[name="' + id + '"][type="'+ type + '"]';
        if (placeholder) {
            inputString += '[placeholder="' + placeholder + '"]';
        }
        let input = new DomEl(inputString);
        let label = new DomEl('label[for="' + id + '"]');
        label.innerText = labelName;
        label.append(input);
        return label; 
    }
}