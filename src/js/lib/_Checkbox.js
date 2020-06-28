export default Checkbox;

import DomEl from "./_DomEl";

class Checkbox {
    constructor(name, labelDisplay, altTextOff, altTextChecked, value) {
        let checked = (value) ? '[checked]' : '';
        this.box = new DomEl('input[type=checkbox][id=' + name + '][name=' + name + ']' + checked);
        this.label = new DomEl('label[for=' + name + '][tabindex=0][describedby=Description' + name +'].checkbox');
        let notification = new DomEl('div.sr-only[tab-index=0][aria-hidden=true][aria-live=assertive][aria-atomic=additions]#Description' + name);
        notification.innerText = (value) ? altTextChecked : altTextOff; 
        this.label.addEventListener('keydown', function(e) {
            if (e.keyCode == 32) {
                this.label.children[0].click();
                notification.innerText = (this.label.children[0].checked) ? altTextChecked : altTextOff;
            }
        });
        this.checkOff = new DomEl('span.fas.fa-circle');
        this.checkOn = new DomEl('span.fas.fa-check-circle');
        this.text = new DomEl('span');
        this.text.innerText = labelDisplay;
        this.label.append(this.box);
        this.label.append(this.checkOff);
        this.label.append(this.checkOn);
        this.label.append(this.text);
        return this.label;
    }
}