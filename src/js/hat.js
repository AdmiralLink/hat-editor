import Hat from 'modules/_hat.js';
import ParagraphBlock from 'modules/_block_paragraph.js';

window.HatRack = function() {
    let BlockRegistry = {
        default: false,
        names: ['paragraph'],
        objects: {
            paragraph: ParagraphBlock
        }
    };
    let Interface = {   
        get_block: function(blockName) {
            if (Interface.has_block(blockName)) {
                return BlockRegistry.objects[blockName];
            }
        },
        get_blocks: function() {
            return BlockRegistry.objects;
        },
        has_block: function(blockName) {
            return (BlockRegistry.names.indexOf(blockName) > -1);
        },
        register_block: function(name, slug, blockObj) {
            BlockRegistry.names.push(slug);
            BlockRegistry.objects[slug] = blockObj;
        },
        start: function(querySelector='.hat-editor') {
            for (var el of document.querySelectorAll(querySelector)) {
                new Hat(el);
            }
        }
    }
    return Interface;
}();