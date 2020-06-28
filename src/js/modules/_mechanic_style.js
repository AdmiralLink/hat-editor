export default StylesMechanic;

import Mechanic from './_mechanic';
import InputField from '../lib/_InputField';

class StylesMechanic extends Mechanic {
    constructor() {
        super({title: 'Block styles', icon: 'paint-brush', class: 'styleBtn'}, 'styleDiv');
        this.setFields();
        this.registerFields();
    }

    focus() {
        this.backgroundColor.children[0].focus();
    }

    setFields() {
        this.backgroundColor = new InputField('backgroundColor', 'Background color', '#FFF', 'text', this.settings.backgroundColor);
        this.textColor = new InputField('textColor', 'Text color', '#000', 'text', this.settings.textColor)
        //TODO: Version 2.0
        //this.background = new Checkbox('background', 'Has Background', 'There is no background set. Hit the space bar to set one', 'Hit the spacebar to unset the current background', this.hasBackground); /*
        this.fields = [
            this.backgroundColor,
            this.textColor
        ]
    }

    settings = {
        backgroundColor: false,
        textColor: false
    }
}