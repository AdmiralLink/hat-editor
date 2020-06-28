export default MechanicController;

import DomEl from './../lib/_DomEl';
import DomButton from './../lib/_DomButton';

class MechanicController {
    constructor(block) {
        this.current = false;
        this.parentBlock = block;
        if (this.parentBlock.settings) {
            this.settings = this.parentBlock.settings;
            delete this.parentBlock.settings;
        } else {
            this.settings = {};
        }
        this.container = new DomEl('div.mechanicsContainer');
        this.parentBlock.el.append(this.container);
        this.mechanics = [];
        this.transition = false;
    }

    add(mechanicObj) {
        this.mechanics.push(mechanicObj.init(this));
    }

    getValues() {
        let mech = this;
        this.mechanics.forEach(function(mechanic) {
            for (let [key, value] of Object.entries(mechanic.getValues())) {
                mech.settings[key] = value;
            }
        });
        return mech.settings;
    }
    
    toggleView(el, btn) {
        if (!this.transition) {
            this.transition = true;
            let mech = this;
            let current = this.current;
            if (current && current == el) {
                let remove = current;
                current.dispatchEvent(new Event('close'));
                this.current = false;
                this.container.style.maxHeight = '0px';
                this.parentBlock.el.style.marginBottom = '0px';
                this.parentBlock.el.classList.remove('showMechanics');
                this.parentBlock.settingsContainer.querySelectorAll('.active')[0].classList.remove('active');
                setTimeout(function() {
                    remove.classList.remove('show');
                    mech.transition = false;
                }, 600);
                setTimeout(function(e) {
                    mech.parentBlock.focus();
                }, 0);
                return false;
            } else {
                if (current) {
                    this.container.classList.add('switch');
                    setTimeout(function(e) {
                        mech.parentBlock.settingsContainer.querySelectorAll('.active')[0].classList.remove('active');
                        current.classList.remove('show');
                        el.classList.add('show');   
                        let offset = el.offsetHeight + 40;
                        mech.container.style.maxHeight = offset + 'px';
                        mech.parentBlock.el.style.marginBottom = offset + 10 + 'px';
                        btn.classList.add('active');
                        mech.container.classList.remove('switch');
                        el.dispatchEvent(new Event('show'));
                        mech.transition = false;
                    }, 350)
                    this.current = el;
                    return true;
                } 
                this.current = el;   
                this.current.classList.add('show');
                let offset = this.current.offsetHeight + 40;
                this.container.style.maxHeight = offset + 'px';
                this.parentBlock.el.classList.add('showMechanics');
                this.parentBlock.el.style.marginBottom = offset + 10 + 'px';
                btn.classList.add('active');
                this.container.classList.remove('switch');
                this.current.dispatchEvent(new Event('show'));
                this.transition = false;
                return true;
            }
        }
    }


}