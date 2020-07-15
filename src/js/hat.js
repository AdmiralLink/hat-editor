import Editor from './modules/_editor.js';
import CodeBlock from './modules/_block_code.js';
import ImageBlock from './modules/_block_image.js';
import ParagraphBlock from './modules/_block_paragraph.js';
import './../sass/hat.sass';

window.Hat = function(init, options) {
    let BlockRegistry = {
        names: ['code', 'image', 'paragraph'],
        objects: {
            code: {
                class: CodeBlock,
                description: 'For code/content that requires strict formatting',
                icon: 'code',
                name: 'Code',
            },
            image: {
                class: ImageBlock,
                description: 'For a single image',
                icon: 'image',
                name: 'Image'
            },
            paragraph: {
                class: ParagraphBlock,
                description: 'For regular text/content',
                icon: 'edit',
                name: 'Text'
            }
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
            let ed = new Editor(el);  
            EditorRegistry.add(ed);
            return ed;
          },
        getBlock: function(blockName) {
            if (Interface.hasBlock(blockName)) {
                return BlockRegistry.objects[blockName];
            } else {
                return false;
            }
        },
        getBlocks: function() {
            return BlockRegistry.objects;
        },
        getBlockName: function(slug) {
            if (BlockRegistry[slug]) {
                return BlockRegistry[slug].name;
            } else {
                return false;
            }
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
        getOption: function(opt) {
            if (Options.hasOwnProperty(opt)) {
                return Options[opt];
            } else {
                return false;
            }
        },
        registerBlock: function(slug, blockObj) {
            BlockRegistry.names.push(slug);
            BlockRegistry.objects[slug] = blockObj;
        },
        start: function(options) {
            for (let [key, value] of Object.entries(options)) {
                Options[key] = value;
            } 
            if (Options.data) {
                let ed = new Editor(document.querySelector(Options.selector), Options.data);
                EditorRegistry.add(ed);
                return ed;
            } else if (Options.init) {
                let elements = document.querySelectorAll(Options.selector);
                if (elements.length == 1) {
                    return Interface.createEditor(elements[0]);
                } else {
                    for (var el of elements) {
                        Interface.createEditor(el);
                    }
                }
            }
          }
    }
    return Interface;
}();