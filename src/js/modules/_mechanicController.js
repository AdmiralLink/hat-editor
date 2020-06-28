export default MechanicController;

import DomEl from './../lib/_DomEl';
import DomButton from './../lib/_DomButton';

class MechanicController {
    constructor(block) {
        this.current = false;
        this.parentBlock = block;
        this.container = new DomEl('div.mechanicsContainer');
        this.parentBlock.middleContainer.insertBefore(this.container, this.parentBlock.contentContainer);
    }

    add(mechanicObj) {
        mechanicObj.init(this);
    }
    
    toggleView(el, btn) {
        let mech = this;
        let current = this.current;
        if (current && current == el) {
            let remove = current;
            current.dispatchEvent(new Event('close'));
            this.current = false;
            this.parentBlock.el.classList.remove('showMechanics');
            this.parentBlock.settingsContainer.querySelectorAll('.active')[0].classList.remove('active');
            setTimeout(function() {
                remove.classList.remove('show');
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
                    btn.classList.add('active');
                    mech.container.classList.remove('switch');
                    el.dispatchEvent(new Event('show'));
                }, 350)
                this.current = el;
                return true;
            } 
            this.current = el;   
            this.current.classList.add('show');
            this.parentBlock.el.classList.add('showMechanics');
            btn.classList.add('active');
            this.container.classList.remove('switch');
            this.current.dispatchEvent(new Event('show'));
            return true;
        }
    }


}