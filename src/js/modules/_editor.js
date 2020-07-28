export default Editor;
import Sortable from '../lib/_Sortable';
import DomEl from '../lib/_DomEl';
import DomButton from '../lib/_DomButton';

let Editor = function(containerEl, data) {
    let Blocks = [];
    let BlockChooser = {
        choiceDiv: new DomEl('div.blockChoices'),
        create: function() {
            BlockChooser.insertAddBlockButton();
            let blockChoices = window.Hat.getBlocks();
            for (let [slug, block] of Object.entries(blockChoices)) {
                let button = new DomButton(block.description, block.icon, 'choiceBtn', block.name); 
                button.dataset.slug = slug;
                BlockChooser.choiceDiv.append(button);
                let control = Interface;
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    BlockChooser.toggle();
                    let button = e.target.closest('button');
                    control.addBlock(true, false, button.dataset.slug);
                });
            };
            Elements.newBlockContainer.append(BlockChooser.choiceDiv);
        },
        insertAddBlockButton: function() {
            var button = new DomEl('button#addBlock[title=Create a new block by clicking here. You will be taken to the block type selector]');
            var icon = new DomEl('i.fas.fa-plus-square');
            button.innerHTML = icon.outerHTML + ' Add block';
            button.addEventListener('click', function(e) {
                e.preventDefault();
                BlockChooser.toggle(this);
            });
            Elements.newBlockContainer.append(button);
        },
        toggle: function(originButton) {
            let ChoiceDiv = BlockChooser.choiceDiv;
            if (ChoiceDiv.classList.contains('show')) {
                ChoiceDiv.classList.remove('show');
            } else {
                ChoiceDiv.classList.add('show');
                setTimeout(function() {
                    ChoiceDiv.children[ChoiceDiv.children.length-1].scrollIntoView({behavior: 'smooth'});
                }, 400);
                ChoiceDiv.children[0].focus();
            }
        }
    };
    let BlockCount = 0;
    let Elements = {
        blockHolder: false,
        container: false,
        newBlockContainer: new DomEl('div#newBlockContainer')
    };
    let Events = {
        fire: function(eventName, element=Elements.blockHolder) {
            element.dispatchEvent(new Event(eventName));
        }
    };
    let Internal = {
        blockCount: 0,
        initialize: function(containerEl, data) {
            Elements.container = containerEl;
            Elements.blockHolder = document.createElement('div');
            Elements.container.append(Elements.blockHolder);
            Elements.container.append(Elements.newBlockContainer);
            if (data) {
                data.forEach(function(blockData) {
                    Interface.loadBlock(blockData);
                });
            } else {
                Interface.addBlock();
            }
            Internal.manageSorting();
            BlockChooser.create();
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
        },
        removeBlock: function(block, defaultAction=true) {
            var blockId = block.el.id;
            if (Blocks.hasOwnProperty(blockId)) {
                block.getPosition();
                if (defaultAction) {
                    let newFocus = (block.position.first) ? block.el.nextSibling.id : block.el.previousSibling.id;
                    Blocks[newFocus].focus();
                }
                block.el.remove();
                Blocks.splice(blockId);
                BlockCount--;
                if (defaultAction) {
                    Events.fire('blockChanged');
                }
            }
        }
    }
    let Interface = {
        addBlock: function(focus=true,position=false, type=window.Hat.getDefault(), data=false) {
            let blockClass = window.Hat.getBlock(type);
            let block = new blockClass.class(this, data);
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
        getBlockPosition: function (blockEl) {
            let blocks = Elements.blockHolder.querySelectorAll('.block');
            let position = { count: BlockCount };
            if (position.count == 1) {
                position.first = true;
                position.last = true;
                position.number = 1;
            } else {
                position.first = (blocks[0] == blockEl);
                position.last = (blocks[BlockCount - 1] == blockEl);
                for (let [idx, checkBlock] of Object.entries(blocks)) {
                    if (checkBlock == blockEl) {
                        position.number = idx;
                    }
                }
            }
            return position;
        },
        getContainer: function () {
            return Elements.container;
        },
        getContents: function () {
            let content = [];
            for (let [key, value] of Object.entries(Blocks)) {
                value.getPosition();
                let contents = value.getContents();
                if (!contents.settings.id) {
                    contents.settings.id = key;
                }
                content[value.position.number] = contents;
            }

            return content;
        },
        loadBlock: function(data) {
            let block = Interface.addBlock(false, false, data.type, data);
        },
        removeAllBlocks: function(replacementData) {
            for (let [id, block] of Object.entries(Blocks)) {
                Internal.removeBlock(block, false);
            };
            if (replacementData) {
                replacementData.forEach(function(blockData) {
                    Interface.loadBlock(blockData);
                });
            } else {
                Interface.addBlock();
            }
          },
          removeBlock: function(block, force=false) {
              if (BlockCount > 1){
                Internal.removeBlock(block);
              }
          },
    };
    Internal.initialize(containerEl, data);
    return Interface;
};