export default DomEl;

class DomEl { 
    constructor(creationString) {
        this.elType = creationString.match(/^(\w+)*/g);
        this.classes = creationString.match(/\.(?![^[]*])([^\s\.\#\[]*)/g);
        this.id = creationString.match(/\#([^\s\.\[]*)/g);
        this.attributes = creationString.match(/\[([^\]]*)/g);
        if (this.elType) {
            this.el = document.createElement(this.elType);
            if (this.classes && this.classes.length > 0) {
                for (var className of this.classes) {
                    this.el.classList.add(className.replace('.',''));
                }
            }
            if (this.attributes && this.attributes.length > 0) {
                for (var attributeString of this.attributes) {
                    let attribute = attributeString.split('=');
                    if (attribute.length == 1) {
                        attribute.push('');
                    } else {
                        attribute[1] = attribute[1].replace(/"/g,'');
                    }
                    attribute[0] = attribute[0].replace('[','');
                    if (['title','href'].indexOf(attribute[0]) > -1) {
                        this.el[attribute[0]] = attribute[1];
                    }
                    this.el.setAttribute(attribute[0],attribute[1]);
                }
            }
            if (this.id && this.id.length == 1) {
                this.el.id = this.id[0].replace('#','');
            }
            return this.el;
        }   
    }
}