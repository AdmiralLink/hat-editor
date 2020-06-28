export default InputField;

import DomEl from './_DomEl.js';

class InputField {
    constructor(id, labelName, placeholder, type, value) {
        type = type || 'text';
        value = value || '';
        let nodeId = id + new Date().getMilliseconds();
        let inputString = 'input#' + nodeId + '[name="' + id + '"][type="'+ type + '"]';
        if (placeholder) {
            inputString += '[placeholder="' + placeholder + '"]';
        }
        let input = new DomEl(inputString);
        if (value) {
            input.value = value;
        }
        let label = new DomEl('label[for="' + nodeId + '"]');
        label.innerText = labelName;
        label.append(input);
        return label; 
    }
}