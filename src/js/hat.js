import Hat from './modules/_hat.js';
import ParagraphBlock from './modules/_block_paragraph.js';
import './../sass/hat.sass';

window.HatRack = function() {
    let EditorRegistry = {
        add: function(hatInstance) {
            this.editors[hatInstance.getContainer()] = hatInstance;
        },
        editors: new Map()
    };
    let BlockRegistry = {
        default: false,
        names: ['paragraph'],
        objects: {
            paragraph: ParagraphBlock
        }
    };
    let Interface = {   
        getBlock: function(blockName) {
            if (Interface.hasBlock(blockName)) {
                return BlockRegistry.objects[blockName];
            }
        },
        getBlocks: function() {
            return BlockRegistry.objects;
        },
        getEditor: function(el) {
            if (this.hasEditor(el)) {
                return EditorRegistry.editors[el];
            } else {
                return false;
            }
        },
        hasBlock: function(blockName) {
            return (BlockRegistry.names.indexOf(blockName) > -1);
        },
        hasEditor: function(el) {
            return (EditorRegistry.editors[el]);
        },
        registerBlock: function(name, slug, blockObj) {
            BlockRegistry.names.push(slug);
            BlockRegistry.objects[slug] = blockObj;
        },
        start: function(querySelector='.hat-editor') {
            for (var el of document.querySelectorAll(querySelector)) {
                EditorRegistry.add(new Hat(el));
            }
        }
    }
    return Interface;
}();