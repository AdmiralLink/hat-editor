export default Block;

import DomEl from './../lib/_DomEl.js';
import DomButton from './../lib/_DomButton.js';
import MiniModal from './../lib/_MiniModal.js';

class Block {
    constructor(hat) {
        this.setup();
        this.editor = hat;
        this.createElement();
        this.registerKeyboardShortcuts();
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
            block.keysDown.push(e.which);
            block.checkKeyboardShortcuts();
        });
        this.el.addEventListener('keyup', function(e) {
            block.keysDown.splice(block.keysDown.indexOf(e.which));
        });
        let blockContainer = this.editor.getBlockContainer();
        blockContainer.addEventListener('blockChanged', function() {
            block.checkBlockSettingsControls();
        });
        this.upButton.addEventListener('click', function() {
            var target = block.el.previousSibling;
            block.el.classList.add('moving-up');
            target.classList.add('moving-down');
            setTimeout(function() {
                block.el.classList.remove('moving-up');
                target.classList.remove('moving-down');
                block.editor.getBlockContainer().insertBefore(block.el, block.el.previousSibling);
                block.editor.fireEvent('blockChanged');
            }, 200);
        });
        this.downButton.addEventListener('click', function() {
            var target = block.el.nextSibling;
            block.el.classList.add('moving-down');
            target.classList.add('moving-up');
            setTimeout(function() {
                block.el.classList.remove('moving-down');
                target.classList.remove('moving-up');
                block.editor.getBlockContainer().insertBefore(block.el, block.el.nextSibling.nextSibling);
                block.editor.fireEvent('blockChanged');
            }, 200);
        });

        this.deleteButton.addEventListener('click', function() {
            let modal = new MiniModal({
                cancelButtonTitle: 'Do not delete this block',
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
        let position = this.editor.getBlockPosition(this.el);
        let up = this.upButton;
        let down = this.downButton;
        let grip = this.moveButton;
        if (position.first) {
            up.setAttribute('disabled','');
        } else {
            up.removeAttribute('disabled');
        }
        if (position.last) {
            down.setAttribute('disabled','');
        } else {
            down.removeAttribute('disabled')
        }
        if (position.count == 1) {
            this.deleteButton.setAttribute('disabled', '');
            grip.setAttribute('disabled','');
        } else {
            this.deleteButton.removeAttribute('disabled');
            grip.removeAttribute('disabled');
        }
    }

    checkKeyboardShortcuts() {
        if (this.keysDown.length > 1) {
            let keys = this.keysDown.sort(function(a,b) { return ((a < b)) ? -1 : 1; });
            if (this.keyboardShortcuts.hasOwnProperty(keys[0])) {
                let primaryKey = this.keyboardShortcuts[keys.shift()];
                if (primaryKey.hasOwnProperty(keys)) {
                    this.keyboardShortcutActions[primaryKey[keys]]();
                }
            }
        }
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

    registerGlobalKeyboardShortcuts() {
        var element = this;
        this.keyboardShortcutActions['deleteBlock'] = function() {
            element.delete();
        };
        this.registerKeyboardShortcut([91,8],'deleteBlock');
        this.registerKeyboardShortcut([93,8],'deleteBlock');
    }

    registerKeyboardShortcut(keys, actionToCall) {
        keys = keys.sort(function(a,b) { return ((a < b)) ? -1 : 1; });
        if (!this.keyboardShortcuts.hasOwnProperty(keys[0])) { 
            this.keyboardShortcuts[keys[0]] = [];
        }
        let primaryKey = this.keyboardShortcuts[keys.shift()];
        if (primaryKey.hasOwnProperty(keys)) {
            return false
        } else {
            primaryKey[keys] = actionToCall;
        }
    }

    registerKeyboardShortcuts() {}

    registerSettings() {}

    setup() {
        this.keysDown = [];
        this.keyboardShortcuts = [];
        this.keyboardShortcutActions = {};
        this.registerGlobalKeyboardShortcuts();
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