import DomEl from './../lib/_DomEl';
import DomButton from './../lib/_DomButton';

export default Mechanic;

class Mechanic {
    constructor(buttonSettings, className) {
        this.button = new DomButton(buttonSettings.title, buttonSettings.icon, buttonSettings.class);
        this.div = new DomEl('div.mechanics.' + className);
        this.registerBasicEvents();
        this.registerEvents();
    }

    focus() {
        this.div.focus();
    }

    getValues() {
        return this.settings;
    }
    
    init(Controller) {
        let mechanic = this;
        this.controller = Controller;
        Controller.parentBlock.settingsContainer.append(this.button);
        Controller.container.append(this.div);
        this.button.addEventListener('click', function(e) {
            e.preventDefault();
            Controller.toggleView(mechanic.div, this);
        });
        return this;
    }

    registerBasicEvents() {
        let mech = this;
        this.div.addEventListener('keydown', function(e) {
            if (e.keyCode == 27) {
                e.preventDefault();
                mech.controller.toggleView(mech.div, mech.button);
            }
        });
        this.div.addEventListener('close', function() {
            mech.saveSettings();
        });
        this.div.addEventListener('show', function() {
            mech.focus();
        });
    }

    registerCloseButton() {
        let mech = this;
        this.closeButton = new DomButton('Close settings panel', false, 'closeBtn', 'Close');
        mech.div.append(this.closeButton);
        this.closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mech.controller.toggleView(mech.div, mech.button);
        });
    }

    registerEvents() { }

    registerFields() {
        let mech = this;
        if (this.fields && this.fields.length > 0) {
            this.fields.forEach(function(field) {
                mech.div.append(field);
            });
        }
        this.registerCloseButton();
    }

    saveSettings() {
        let mech = this;
        if (this.fields && this.fields.length > 0) {
            this.fields.forEach(function(field) {
                field = field.children[0];
                if (field.getAttribute('type') == 'checkbox') {
                    mech.settings[field.getAttribute('name')] = field.checked;
                } else {
                    mech.settings[field.getAttribute('name')] = field.value;
                }
            });
        }
    }
}