export default LinkModal;

import Checkbox from '../lib/_Checkbox';
import DomEl from "../lib/_DomEl";
import InputField from "../lib/_InputField";
import MiniModal from "../lib/_MiniModal";
import ErrorModal from './_ErrorModal';

class LinkModal extends MiniModal {
    constructor(details) {
        super(false, true);
        if (details) {
            for (let [key, value] of Object.entries(details)) {
                this[key] = value;
            }
        }
        this.setDefaults();
        this.createElements();
        this.constructModal(this.getModalOptions());
    }

    confirm() {
        if (this.hrefField.children[0].value) {
            this.values = {
                href: this.hrefField.children[0].value,
                text: this.textField.children[0].value
            };
            if (this.blankField.children[0].checked) {
                this.values.target = '_blank';
            }
            this.modalContainer.dispatchEvent(new Event('confirmed'));
            this.confirmed = true;
            this.close();
        } else {
            new ErrorModal('You must include a link');
        }
    }

    createElements() {
        this.form = new DomEl('div#linkForm');
        this.hrefField = new InputField('linkHref', 'Link', 'https://google.com or tel:18009453669 or mailto:me@you.com', 'text', this.href);
        this.blankField = new Checkbox('targetBlank', 'Open in new window', 'Select to have the link open in a new window/tab', this.blank);
        this.textField = new InputField('displayText', 'Text to display', false, 'text', this.text);   
        this.form.append(this.hrefField);
        this.form.append(this.textField);
        this.form.append(this.blankField);
    }

    getModalOptions() {
        return {
            confirm: true,
            confirmButtonTitle: 'Insert/update link',
            content: this.form,
            contentType: 'node',
            focusTarget: this.hrefField
        };
    }

    setDefaults() {
        ['href','blank','text'].forEach((val) => {
            if (!this[val]) {
                this.val = false;
            }
        });
    }
}