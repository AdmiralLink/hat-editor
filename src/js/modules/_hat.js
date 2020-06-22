export default Hat;
import Sortable from './../lib/_Sortable.js';
import DomEl from './../lib/_DomEl.js';

let Hat = function(containerEl) {
    let Blocks = [];
    let BlockCount = 0;
    let Elements = {
        blockHolder: false,
        container: false
    };
    let Events = {
        fire: function(eventName, element=Elements.blockHolder) {
            element.dispatchEvent(new Event(eventName));
        }
    };
    let Internal = {
        blockCount: 0,
        insertAddBlockButton: function() {
            var a = new DomEl('a.block[title="Add a new block (and select it)][href="javascript:void(0)"]');
            var icon = new DomEl('i.fas.fa-plus-square');
            a.innerHTML = icon.outerHTML + ' Add block';
            a.addEventListener('click', function() {
                //TODO: Show block list
                Interface.addBlock();
            });
            Elements.container.append(a);
        },
        initialize: function(containerEl) {
            Elements.container = containerEl;
            Elements.blockHolder = document.createElement('div');
            Elements.container.append(Elements.blockHolder);
            Internal.insertAddBlockButton();
            Interface.addBlock();
            Internal.manageSorting();
            document.execCommand('defaultParagraphSeparator', false, 'p');
        },
        manageSorting: function() {
            Internal.sorting = Sortable.create(Elements.blockHolder, { animation: 150, group: 'blocks', handle: 'button.handle', draggable: '.block', onEnd: function() { Events.fire('blockChanged')} });
            Elements.blockHolder.addEventListener('blockChanged',function() {
                if (BlockCount == 1) {
                    Internal.sorting.option('sorting', false);
                } else {
                    Internal.sorting.option('sorting', true);
                }
            });
        } 
    }
    let Interface = {
        addBlock: function(focus=true,position=false, type='paragraph') {
            let blockClass = window.HatRack.getBlock(type);
            let block = new blockClass(this);
            block.el.id = 'block' + new Date().getTime();
            if (position === false) {
                Elements.blockHolder.appendChild(block.el);
            } else {
                Elements.blockHolder.children[position].after(block.el);
            }
            if (focus) {
                block.focus();
            }
            Blocks[block.el.id] = block;
            BlockCount++;
            Events.fire('blockChanged');
        },
        fireEvent: function(eventName, element=Elements.blockHolder) {
            Events.fire(eventName, element);
        },
        getBlockContainer: function() {
            return Elements.blockHolder;
        },
        getBlockPosition: function(blockEl) {
            let blocks = Elements.blockHolder.querySelectorAll('.block');
            let position = { count: BlockCount };
            if (position.count == 1) {
                position.first = true;
                position.last = true;
            } else {
                position.first = (blocks[0] == blockEl);
                position.last = (blocks[BlockCount-1] == blockEl);
            }
            return position;
        },
        removeBlock: function(block) {
            var blockId = block.el.id;
            if (BlockCount > 1){
                if (Blocks.hasOwnProperty(blockId)) {
                    block.getPosition();
                    let newFocus = (block.position.first) ? block.el.nextSibling.id : block.el.previousSibling.id;
                    Blocks[newFocus].focus();
                    block.el.remove();
                    Blocks.splice(blockId);
                    BlockCount--;
                    Events.fire('blockChanged');
                }
            }
        },
        getContainer: function() {
            return Elements.container;
        }
    };
    Internal.initialize(containerEl);
    return Interface;
};