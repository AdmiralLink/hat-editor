export default Block;

import DomEl from './../lib/_DomEl.js';
import DomButton from './../lib/_DomButton.js';
import MiniModal from './../lib/_MiniModal.js';

class Block {
    constructor(hat) {
        this.setup();
        this.editor = hat;
        this.createElement();
        this.registerSettings();
        this.blockRegistration();
        this.addGlobalEvents();
        this.addEvents();
    }

    addBlockControls() {
        this.upButton = new DomEl('button[aria-label="Move block up one position"]');
        let upArrow = new DomEl('i.fas.fa-chevron-up')
        this.upButton.append(upArrow);
        this.moveButton = new DomEl('button[aria-label="Click and drag to move block"].handle');
        let gripIcon = new DomEl('i.fas.fa-grip-horizontal');
        this.moveButton.append(gripIcon); 
        this.downButton = new DomEl('button[aria-label="Move block down one position]');
        let downArrow = new DomEl('i.fas.fa-chevron-down');
        this.downButton.append(downArrow);
        this.blockControlsContainer.append(this.upButton);
        this.blockControlsContainer.append(this.moveButton);
        this.blockControlsContainer.append(this.downButton);

        this.deleteButton = new DomButton('Delete block', 'trash-alt', 'deleteBtn');
        this.settingsContainer.append(this.deleteButton);
    }
    
    addGlobalEvents() {
        var block = this;
        this.el.addEventListener('keydown', function(e) {
            block.checkKeyboardShortcuts(e);
        });
        let blockContainer = this.editor.getBlockContainer();
        blockContainer.addEventListener('blockChanged', function() {
            block.checkBlockSettingsControls();
        });
        this.upButton.addEventListener('click', function() {
            block.moveBlock('up');
        });
        this.downButton.addEventListener('click', function() {
            block.moveBlock('down')
        });

        this.deleteButton.addEventListener('click', function() {
            let modal = new MiniModal({
                cancelButtonTitle: 'Do not delete this block',
                confirmButtonClass: 'deleteBtn',
                confirmButtonText: 'Delete',
                confirmButtonTitle: 'Yes, delete the block',
                closeX: false,
                content: 'Are you sure you want to delete this block?',
                confirm: true
            });
            modal.addEventListener('confirmed', function() {
                block.delete();
            });
            modal.addEventListener('canceled', function() {
                block.focus();
            });
        });
    }

    addEvents() {}

    addInfoButton() {
        var infoButton = new DomEl('button.settings[aria-role="tab"][title="Open block settings dialog"][aria-selected="false"][tabindex="-1"][aria-controls="settings-info"]');
        var iconEl = new DomEl('i.fas.fa-info');
        infoButton.append(iconEl);
        this.settingsContainer.append(infoButton);
    }

    blockRegistration() {}

    checkBlockSettingsControls() {
        this.getPosition();
        let up = this.upButton;
        let down = this.downButton;
        let grip = this.moveButton;
        if (this.position.first) {
            up.setAttribute('disabled','');
        } else {
            up.removeAttribute('disabled');
        }
        if (this.position.last) {
            down.setAttribute('disabled','');
        } else {
            down.removeAttribute('disabled')
        }
        if (this.position.count == 1) {
            this.deleteButton.setAttribute('disabled', '');
            grip.setAttribute('disabled','');
        } else {
            this.deleteButton.removeAttribute('disabled');
            grip.removeAttribute('disabled');
        }
    }

    checkKeyboardShortcuts(e) {
        if (e.ctrlKey | e.metaKey) {
            if (e.shiftKey) {
                switch (e.keyCode) {
                    case 38:
                        this.moveBlock('up');
                        break;
                    case 40:
                        this.moveBlock('down');
                        break;
                }
            } else {
                switch (e.keyCode) {
                    case 8:
                    case 46:
                        this.delete();
                        break;
                }
            }
        }
        this.keyboardShortcuts(e);
    }

    createElement() {}

    delete() {
        this.editor.removeBlock(this);
    }

    focus() {
        this.contentEl.focus();
    }

    getElement() {
        return this.el;
    }

    getContent() {
        return this.contentEl.innerHtml();
    }

    getPosition() {
        this.position = this.editor.getBlockPosition(this.el);
    }

    keyboardShortcuts(e) {}

    moveBlock(direction) {
        this.getPosition();
        if (this.position.count == 1 || this.position.first && direction == 'up' || this.position.last && direction == 'down') {
            return false;
        }
        var block = this;
        let opposite = (direction == 'up') ? 'down' : 'up';
        let target = (direction == 'up') ? block.el.previousSibling : block.el.nextSibling;
        let insertPoint = (direction == 'up') ? block.el.previousSibling : block.el.nextSibling.nextSibling;
        block.el.classList.add('moving-' + direction);
        target.classList.add('moving-' + opposite);
        setTimeout(function() {
            block.el.classList.remove('moving-' + direction);
            target.classList.remove('moving-' + opposite);
            block.editor.getBlockContainer().insertBefore(block.el, insertPoint);
            block.editor.fireEvent('blockChanged');
            block.focus();
        }, 200);
    }

    registerSettings() {}

    setup() {
        this.keysDown = [];
        this.el = new DomEl('div.block')
        this.blockControlsContainer = new DomEl('div[aria-label="Block Controls"]');
        this.contentContainer = new DomEl('div');
        this.settingsContainer = new DomEl('div[aria-role="tablist"][aria-label="Block settings]');
        this.el.append(this.blockControlsContainer);
        this.el.append(this.contentContainer);
        this.el.append(this.settingsContainer);
        this.addBlockControls();
    }
}