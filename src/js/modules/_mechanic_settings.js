export default SettingsMechanic;

import Checkbox from '../lib/_Checkbox';
import InputField from './../lib/_InputField';
import Mechanic from './_mechanic';

class SettingsMechanic extends Mechanic {
    constructor() {
        super({title: 'Block settings', icon: 'cogs', class: 'settingsBtn'}, 'settingsDiv');
    }

    focus() {
        this.idField.children[0].focus();
    }

    setFields() {
        this.idField = new InputField('id', 'Block ID', 'AwesomeBlock', 'text', this.settings.id);
        this.classField = new InputField('class', 'Block classes', 'Space-separated list of classes', 'text', this.settings.class);
        this.fields = [
            this.idField,
            this.classField,
            new Checkbox('blockVisible', 'Block is visible on frontend', 'The block will not be visible. Hit spacebar to make it visible', 'The block will be visible. Hit spacebar to make it not visible', this.settings.blockVisible)
        ];
    }

    settings = {
        blockVisible: true,
        class: false,
        id: false,
    }
}