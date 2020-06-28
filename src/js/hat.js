import Editor from './modules/_editor.js';
import ParagraphBlock from './modules/_block_paragraph.js';
import './../sass/hat.sass';

window.Hat = function(init, options) {
    let BlockRegistry = {
        names: ['paragraph'],
        objects: {
            paragraph: ParagraphBlock
        }
    };
    let EditorRegistry = {
        add: function(hatInstance) {
            this.editors[hatInstance.getContainer()] = hatInstance;
        },
        editors: new Map()
    };
    let Options = {
        default: 'paragraph',
        init: true,
        selector: '.hat-editor'
    };
    let Interface = {   
        createEditor: function(el) {
            EditorRegistry.add(new Editor(el));
        },
        getBlock: function(blockName) {
            if (Interface.hasBlock(blockName)) {
                return BlockRegistry.objects[blockName];
            }
        },
        getBlocks: function() {
            return BlockRegistry;
        },
        getDefault: function() {
            return Options.default;
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
        registerBlock: function(slug, blockObj) {
            BlockRegistry.names.push(slug);
            BlockRegistry.objects[slug] = blockObj;
        },
        start: function(options) {
            for (let [key, value] of Object.entries(options)) {
                Options[key] = value;
            };
            if (Options.data) {
                EditorRegistry.add(new Editor(document.querySelector(Options.selector), Options.data));
            } else if (Options.init) {
                for (var el of document.querySelectorAll(Options.selector)) {
                    Interface.createEditor(el)
                }
            }
        }
    }
    return Interface;
}();